"use server";

import { createClient } from "@/lib/supabase/server";
import { GuestRepository } from "./repository";
import { GuestService } from "./service";

import { GuestSearch } from "./types";
import { GuestImport, GuestInsertDTO, GuestUpdateDTO } from "./schema";

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
