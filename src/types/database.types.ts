export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invitations: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          slug: string;
          theme: string;
          status: "draft" | "published" | "archived";
          locale: string;
          music_auto_play: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          slug: string;
          theme?: string;
          status?: "draft" | "published" | "archived";
          locale?: string;
          music_auto_play?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          slug?: string;
          theme?: string;
          status?: "draft" | "published" | "archived";
          locale?: string;
          music_auto_play?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      drafts: {
        Row: {
          invitation_id: string;
          payload: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          invitation_id: string;
          payload?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          invitation_id?: string;
          payload?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      couples: {
        Row: {
          id: string;
          invitation_id: string;
          role: "groom" | "bride";
          name: string;
          full_name: string;
          father_name: string | null;
          mother_name: string | null;
          instagram: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          role: "groom" | "bride";
          name: string;
          full_name: string;
          father_name?: string | null;
          mother_name?: string | null;
          instagram?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          role?: "groom" | "bride";
          name?: string;
          full_name?: string;
          father_name?: string | null;
          mother_name?: string | null;
          instagram?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          invitation_id: string;
          title: string;
          date: string;
          start_time: string | null;
          end_time: string | null;
          location_name: string;
          address: string;
          google_maps_url: string | null;
          is_main_event: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          title: string;
          date: string;
          start_time?: string | null;
          end_time?: string | null;
          location_name: string;
          address: string;
          google_maps_url?: string | null;
          is_main_event?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          title?: string;
          date?: string;
          start_time?: string | null;
          end_time?: string | null;
          location_name?: string;
          address?: string;
          google_maps_url?: string | null;
          is_main_event?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      stories: {
        Row: {
          id: string;
          invitation_id: string;
          title: string;
          date_text: string | null;
          description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          title: string;
          date_text?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          title?: string;
          date_text?: string | null;
          description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          invitation_id: string;
          url: string;
          caption: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          url: string;
          caption?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          url?: string;
          caption?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gifts: {
        Row: {
          id: string;
          invitation_id: string;
          bank_name: string;
          account_number: string;
          account_name: string;
          is_ewallet: boolean;
          qr_code_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          bank_name: string;
          account_number: string;
          account_name: string;
          is_ewallet?: boolean;
          qr_code_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          bank_name?: string;
          account_number?: string;
          account_name?: string;
          is_ewallet?: boolean;
          qr_code_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      guests: {
        Row: {
          id: string;
          invitation_id: string;
          name: string;
          phone_number: string | null;
          slug: string;
          max_pax: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          name: string;
          phone_number?: string | null;
          slug: string;
          max_pax?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          name?: string;
          phone_number?: string | null;
          slug?: string;
          max_pax?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      rsvps: {
        Row: {
          guest_id: string;
          status: "pending" | "attending" | "declined";
          attending_pax: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          guest_id: string;
          status?: "pending" | "attending" | "declined";
          attending_pax?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          guest_id?: string;
          status?: "pending" | "attending" | "declined";
          attending_pax?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      wishes: {
        Row: {
          id: string;
          invitation_id: string;
          guest_name: string;
          message: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          guest_name: string;
          message: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          guest_name?: string;
          message?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      media_assets: {
        Row: {
          id: string;
          invitation_id: string;
          bucket: string;
          storage_path: string;
          public_url: string;
          file_name: string;
          mime_type: string | null;
          file_size: number | null;
          media_type: "image" | "audio" | "video" | "qr";
          created_at: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          bucket: string;
          storage_path: string;
          public_url: string;
          file_name: string;
          mime_type?: string | null;
          file_size?: number | null;
          media_type: "image" | "audio" | "video" | "qr";
          created_at?: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          bucket?: string;
          storage_path?: string;
          public_url?: string;
          file_name?: string;
          mime_type?: string | null;
          file_size?: number | null;
          media_type?: "image" | "audio" | "video" | "qr";
          created_at?: string;
        };
      };
    };
  };
}
