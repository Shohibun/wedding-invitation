"use server";

import { createClient } from "@/lib/supabase/server";
import { GuestRepository } from "./repository";
import { GuestService } from "./service";
import { revalidatePath } from "next/cache";
import { GuestSearch, GuestImport } from "./types";

async function getService() {
  const supabase = await createClient();
  const repository = new GuestRepository(supabase);
  return new GuestService(repository);
}

export async function getGuestByIdAction(id: string, invitationId?: string) {
  try {
    const service = await getService();
    const guest = await service.getGuestById(id, invitationId);
    return { success: true, data: guest };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function searchGuestsAction(params: GuestSearch) {
  try {
    const service = await getService();
    const result = await service.searchGuests(params);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function createGuestAction(payload: unknown) {
  try {
    const service = await getService();
    const guest = await service.createGuest(payload);
    return { success: true, data: guest };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateGuestAction(id: string, invitationId: string, payload: unknown) {
  try {
    const service = await getService();
    const guest = await service.updateGuest(id, invitationId, payload);
    return { success: true, data: guest };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function deleteGuestAction(id: string, invitationId: string) {
  try {
    const service = await getService();
    await service.deleteGuest(id, invitationId);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function bulkCreateGuestsAction(invitationId: string, guests: GuestImport[]) {
  try {
    const service = await getService();
    const result = await service.bulkCreateGuests(invitationId, guests);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function bulkDeleteGuestsAction(ids: string[], invitationId: string) {
  try {
    const service = await getService();
    await service.bulkDeleteGuests(ids, invitationId);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getGuestStatisticsAction(invitationId: string) {
  try {
    const service = await getService();
    const stats = await service.getStatistics(invitationId);
    return { success: true, data: stats };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getAllGuestsAction(invitationId: string) {
  try {
    const service = await getService();
    // Use an arbitrarily large limit to fetch all for client-side processing
    const { data } = await service.searchGuests({
      invitation_id: invitationId,
      limit: 10000,
    });
    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function importGuestsAction(invitationId: string, rawObjects: unknown[]) {
  try {
    const service = await getService();
    const summary = await service.importGuests(invitationId, rawObjects, "skip");
    return { success: true, data: summary };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function regenerateGuestTokenAction(id: string, invitationId: string) {
  try {
    const service = await getService();
    const token = await service.regenerateGuestToken(id, invitationId);
    return { success: true, data: token };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateGuestRsvpAction(
  id: string,
  invitationId: string,
  status: "pending" | "accepted" | "declined" | "maybe"
) {
  try {
    const service = await getService();
    await service.updateRsvpStatus(id, invitationId, status);
    revalidatePath(`/invitations/${invitationId}/guests`);
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update RSVP",
    };
  }
}

export async function updateGuestAttendanceAction(
  id: string,
  invitationId: string,
  status: "not_checked_in" | "checked_in" | "checked_out"
) {
  try {
    const service = await getService();
    await service.updateAttendanceStatus(id, invitationId, status);
    revalidatePath(`/invitations/${invitationId}/guests`);
    return { success: true };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update Attendance",
    };
  }
}
