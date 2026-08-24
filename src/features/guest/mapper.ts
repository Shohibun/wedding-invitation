import { Guest } from "./types";

export class GuestMapper {
  static toDomain(raw: Record<string, unknown>): Guest {
    return {
      id: raw.id as string,
      invitation_id: raw.invitation_id as string,
      name: raw.name as string,
      phone_number: (raw.phone_number as string) || null,
      slug: raw.slug as string,
      max_pax: raw.max_pax as number,
      created_at: raw.created_at as string,
      updated_at: raw.updated_at as string,
    };
  }

  static toPersistence(domain: Partial<Guest>): Record<string, unknown> {
    const payload: Record<string, unknown> = { ...domain };
    // Remove fields that should not be updated directly if they exist
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;
    return payload;
  }
}
