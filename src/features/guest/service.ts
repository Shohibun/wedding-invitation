import { GuestRepository } from "./repository";
import {
  Guest,
  GuestSearch,
  GuestImport,
  GuestStatistics,
  GuestStatus,
  RsvpStatus,
  AttendanceStatus,
  GuestActivity,
} from "./types";
import { createGuestSchema, updateGuestSchema, bulkGuestSchema } from "./schema";
import { slugify as generateSlug } from "@/lib/utils/slugify";
import { validateGuestImport } from "@/lib/import/validation";

export class GuestService {
  constructor(private readonly repository: GuestRepository) {}

  async getGuestById(id: string, invitationId?: string): Promise<Guest | null> {
    const guest = await this.repository.getById(id);
    if (!guest) return null;

    // Ownership validation if invitationId is provided
    if (invitationId && guest.invitation_id !== invitationId) {
      throw new Error("Unauthorized: Guest does not belong to this invitation");
    }

    return guest;
  }

  async searchGuests(params: GuestSearch): Promise<{ data: Guest[]; count: number }> {
    return this.repository.search(params);
  }

  async createGuest(payload: unknown): Promise<Guest> {
    const validated = createGuestSchema.parse(payload);

    // Generate a unique slug based on name
    const baseSlug = generateSlug(validated.name);
    let slug = baseSlug;

    // Ensure slug uniqueness within the invitation
    let counter = 1;
    let isUnique = false;
    while (!isUnique) {
      const existing = await this.repository.getBySlug(validated.invitation_id, slug);
      if (!existing) {
        isUnique = true;
      } else {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const newGuest = await this.repository.create({
      ...validated,
      slug,
    });

    return newGuest;
  }

  async updateGuest(id: string, invitationId: string, payload: unknown): Promise<Guest> {
    // Validate ownership
    await this.getGuestById(id, invitationId);

    const validated = updateGuestSchema.parse(payload);

    // If name changed, we could update the slug, but usually slugs are immutable.
    // For now, we update the data without touching the slug.
    return this.repository.update(id, validated);
  }

  async deleteGuest(id: string, invitationId: string): Promise<void> {
    // Validate ownership
    await this.getGuestById(id, invitationId);

    await this.repository.delete(id);
  }

  async bulkCreateGuests(invitationId: string, guests: GuestImport[]): Promise<Guest[]> {
    const validated = bulkGuestSchema.parse(guests);

    if (validated.length === 0) return [];

    // Create sequentially or generate unique slugs first then bulk insert
    const payloads: Partial<Guest>[] = [];
    for (const guest of validated) {
      const baseSlug = generateSlug(guest.name);
      let slug = baseSlug;
      let counter = 1;
      let isUnique = false;
      while (!isUnique) {
        // Checking against existing DB
        const existingDB = await this.repository.getBySlug(invitationId, slug);
        // Checking against already generated payloads in this batch
        const existingBatch = payloads.find((p) => p.slug === slug);

        if (!existingDB && !existingBatch) {
          isUnique = true;
        } else {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }

      payloads.push({
        invitation_id: invitationId,
        name: guest.name,
        phone_number: guest.phone_number || null,
        slug,
        category: guest.category || "general",
        pax: guest.pax || 1,
        guest_status: "active" as GuestStatus,
        rsvp_status: "pending" as RsvpStatus,
        attendance_status: "not_checked_in" as AttendanceStatus,
      });
    }

    return this.repository.bulkCreate(payloads);
  }

  async importGuests(
    invitationId: string,
    rawObjects: unknown[],
    strategy: "skip" | "update" | "duplicate" = "skip"
  ) {
    // Fetch existing guests to detect duplicates
    const { data: existingGuests } = await this.searchGuests({
      invitation_id: invitationId,
      limit: 10000,
    });

    const validationResult = validateGuestImport(rawObjects, existingGuests);

    // If strategy === 'skip', we only insert the valid ones
    // In the future, 'update' would split into creates and updates
    if (strategy === "skip") {
      if (validationResult.valid.length > 0) {
        await this.bulkCreateGuests(invitationId, validationResult.valid);
      }
    }

    return validationResult;
  }

  async bulkDeleteGuests(ids: string[], invitationId: string): Promise<void> {
    if (ids.length === 0) return;

    // Validate ownership for all
    for (const id of ids) {
      await this.getGuestById(id, invitationId);
    }

    await this.repository.bulkDelete(ids);
  }

  async getGuestBySlugAndToken(slug: string, token: string): Promise<Guest | null> {
    return this.repository.getBySlugAndToken(slug, token);
  }

  async regenerateGuestToken(id: string, invitationId: string): Promise<string> {
    await this.getGuestById(id, invitationId); // ensure ownership
    return this.repository.regenerateToken(id);
  }

  async trackGuestVisit(id: string): Promise<void> {
    return this.repository.trackVisit(id);
  }

  generateGuestLink(invitationSlug: string, guestId: string): string {
    return `/invitation/${invitationSlug}?guest=${guestId}`;
  }

  async getStatistics(invitationId: string): Promise<GuestStatistics> {
    const { data: allGuests } = await this.repository.search({
      invitation_id: invitationId,
      limit: 10000,
    });

    const stats: GuestStatistics = {
      total: allGuests.length,
      invited: 0,
      confirmed: 0,
      pending: 0,
      declined: 0,
      checkedIn: 0,
      notArrived: 0,
      attendanceRate: 0,
      rsvpRate: 0,
      acceptanceRate: 0,
      totalPax: 0,
    };

    let rsvpResponded = 0;

    for (const guest of allGuests) {
      if (guest.guest_status === "active") stats.invited++;

      if (guest.rsvp_status === "accepted") {
        stats.confirmed++;
        stats.totalPax += guest.pax;
        rsvpResponded++;
      } else if (guest.rsvp_status === "declined") {
        stats.declined++;
        rsvpResponded++;
      } else if (guest.rsvp_status === "maybe") {
        rsvpResponded++;
      } else {
        stats.pending++;
      }

      if (guest.attendance_status === "checked_in") {
        stats.checkedIn++;
      } else if (guest.attendance_status === "not_checked_in" && guest.rsvp_status === "accepted") {
        stats.notArrived++;
      }
    }

    if (stats.total > 0) {
      stats.rsvpRate = Math.round((rsvpResponded / stats.total) * 100);
      stats.acceptanceRate = Math.round((stats.confirmed / stats.total) * 100);
    }
    if (stats.confirmed > 0) {
      stats.attendanceRate = Math.round((stats.checkedIn / stats.confirmed) * 100);
    }

    return stats;
  }

  async getRecentActivity(invitationId: string): Promise<GuestActivity[]> {
    const { data } = await this.repository.search({
      invitation_id: invitationId,
      limit: 10,
      sortBy: "updated_at",
      sortOrder: "desc",
    });

    return data.map((guest) => {
      let action = "Updated";
      let timestamp = guest.updated_at;

      if (guest.attendance_status === "checked_in") {
        action = "Checked In";
        if (guest.last_visited_at) timestamp = guest.last_visited_at;
      } else if (guest.rsvp_status === "accepted" || guest.rsvp_status === "declined") {
        action = `RSVP ${guest.rsvp_status}`;
      } else if (guest.created_at === guest.updated_at) {
        action = "Added";
      }

      return {
        guest_id: guest.id,
        name: guest.name,
        action,
        timestamp,
      };
    });
  }

  async updateRsvpStatus(id: string, invitationId: string, status: RsvpStatus): Promise<void> {
    const guest = await this.getGuestById(id, invitationId);
    if (!guest) throw new Error("Guest not found");
    if (guest.guest_status !== "active") {
      throw new Error("Only active invited guests may RSVP.");
    }
    await this.repository.update(id, { rsvp_status: status });
  }

  async updateAttendanceStatus(
    id: string,
    invitationId: string,
    status: AttendanceStatus
  ): Promise<void> {
    const guest = await this.getGuestById(id, invitationId);
    if (!guest) throw new Error("Guest not found");
    if (guest.rsvp_status !== "accepted") {
      throw new Error("Only guests who have accepted their RSVP may check in.");
    }
    await this.repository.update(id, { attendance_status: status });
  }
}
