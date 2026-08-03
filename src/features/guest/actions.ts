"use server";

import { createClient } from "@/lib/supabase/server";
import { GuestRepository } from "./repository";
import { GuestService } from "./service";

import { GuestSearch } from "./types";
import { GuestImport, GuestInsertDTO, GuestUpdateDTO } from "./schema";

import { requireAuth } from "@/features/auth/server-guards";

async function getService() {
  await requireAuth();
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

export async function createGuestAction(payload: GuestInsertDTO) {
  try {
    const service = await getService();
    const guest = await service.createGuest(payload);
    return { success: true, data: guest };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateGuestAction(id: string, invitationId: string, payload: GuestUpdateDTO) {
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

export async function importGuestsAction(invitationId: string, rawObjects: unknown[]) {
  try {
    const service = await getService();
    const result = await service.importGuests(invitationId, rawObjects);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function getAllGuestsAction(invitationId: string) {
  try {
    const service = await getService();
    const result = await service.searchGuests({ invitation_id: invitationId, limit: 10000 });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
