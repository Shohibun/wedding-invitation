import { SupabaseClient } from "@supabase/supabase-js";
import { PersonRepository } from "./repository";
import { personSchema, PersonInput } from "./schema";
import { Person } from "./types";

export class PersonService {
  private repository: PersonRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new PersonRepository(supabase);
  }

  async getById(id: string): Promise<Person | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Person[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: PersonInput): Promise<Person> {
    const validatedData = personSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: PersonInput): Promise<Person> {
    const validatedData = personSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
