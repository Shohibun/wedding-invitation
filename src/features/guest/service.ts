import { GuestRepository } from "./repository";
import { GuestSearch } from "./types";
import {
  GuestImport,
  GuestInsertDTO,
  GuestUpdateDTO,
  createGuestSchema,
  updateGuestSchema,
  bulkGuestSchema,
} from "./schema";
import { Guest as GuestType } from "./types";
import { slugify as generateSlug } from "@/lib/utils/slugify";
import { validateGuestImport } from "@/lib/import/validation";

export class GuestService {
  constructor(private readonly repository: GuestRepository) {}

  async getGuestById(id: string, invitationId?: string): Promise<GuestType | null> {
    const guest = await this.repository.getById(id);
    if (!guest) return null;

    if (invitationId && guest.invitation_id !== invitationId) {
      throw new Error("Unauthorized: Guest does not belong to this invitation");
    }

    return guest;
  }

  async getGuestByGlobalSlug(slug: string): Promise<GuestType | null> {
    return this.repository.getByGlobalSlug(slug);
  }

  async searchGuests(params: GuestSearch): Promise<{ data: GuestType[]; count: number }> {
    return this.repository.search(params);
  }

  async createGuest(payload: GuestInsertDTO): Promise<GuestType> {
    const validated = createGuestSchema.parse(payload);

    let slug = validated.slug;
    if (!slug) {
      slug = generateSlug(validated.name);
    }

    let counter = 1;
    let isUnique = false;
    while (!isUnique) {
      const existing = await this.repository.getBySlug(validated.invitation_id, slug);
      if (!existing) {
        isUnique = true;
      } else {
        slug = `${generateSlug(validated.name)}-${counter}`;
        counter++;
      }
    }

    return this.repository.create({
      ...validated,
      slug,
    });
  }

  async updateGuest(id: string, invitationId: string, payload: GuestUpdateDTO): Promise<GuestType> {
    await this.getGuestById(id, invitationId);
    const validated = updateGuestSchema.parse(payload);
    return this.repository.update(id, validated);
  }

  async deleteGuest(id: string, invitationId: string): Promise<void> {
    await this.getGuestById(id, invitationId);
    await this.repository.delete(id);
  }

  async bulkCreateGuests(invitationId: string, guests: GuestImport[]): Promise<GuestType[]> {
    const validated = bulkGuestSchema.parse(guests);
    if (validated.length === 0) return [];

    const payloads: Partial<GuestType>[] = [];
    for (const guest of validated) {
      let slug = guest.slug || generateSlug(guest.name);
      let counter = 1;
      let isUnique = false;
      while (!isUnique) {
        const existingDB = await this.repository.getBySlug(invitationId, slug);
        const existingBatch = payloads.find((p) => p.slug === slug);

        if (!existingDB && !existingBatch) {
          isUnique = true;
        } else {
          slug = `${generateSlug(guest.name)}-${counter}`;
          counter++;
        }
      }

      payloads.push({
        invitation_id: invitationId,
        name: guest.name,
        phone_number: guest.phone_number || null,
        slug,
        max_pax: guest.max_pax || 1,
      });
    }

    return this.repository.bulkCreate(payloads);
  }

  async importGuests(
    invitationId: string,
    rawObjects: unknown[],
    strategy: "skip" | "update" | "duplicate" = "skip"
  ) {
    const { data: existingGuests } = await this.searchGuests({
      invitation_id: invitationId,
      limit: 10000,
    });

    const validationResult = validateGuestImport(rawObjects, existingGuests);

    if (strategy === "skip" && validationResult.valid.length > 0) {
      await this.bulkCreateGuests(invitationId, validationResult.valid as GuestImport[]);
    }

    return validationResult;
  }

  async bulkDeleteGuests(ids: string[], invitationId: string): Promise<void> {
    if (ids.length === 0) return;

    for (const id of ids) {
      await this.getGuestById(id, invitationId);
    }
    await this.repository.bulkDelete(ids);
  }

  generateGuestLink(invitationSlug: string, guestId: string): string {
    return `/invitation/${invitationSlug}?guest=${guestId}`;
  }
}
