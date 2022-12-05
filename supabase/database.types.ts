export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          created_at: string
          tournament_id: string
          player_white_id: string
          player_black_id: string
          result: string | null
          round: number
        }
        Insert: {
          id?: string
          created_at?: string
          tournament_id: string
          player_white_id: string
          player_black_id: string
          result?: string | null
          round: number
        }
        Update: {
          id?: string
          created_at?: string
          tournament_id?: string
          player_white_id?: string
          player_black_id?: string
          result?: string | null
          round?: number
        }
      }
      profile_tournament: {
        Row: {
          profile_id: string
          created_at: string
          tournament_id: string
          participates: boolean | null
          has_board: boolean | null
        }
        Insert: {
          profile_id: string
          created_at?: string
          tournament_id: string
          participates?: boolean | null
          has_board?: boolean | null
        }
        Update: {
          profile_id?: string
          created_at?: string
          tournament_id?: string
          participates?: boolean | null
          has_board?: boolean | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
        }
        Insert: {
          id: string
          created_at?: string
          username: string
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          created_at: string
          location: string
          date: string
          time: string
        }
        Insert: {
          id?: string
          created_at?: string
          location: string
          date: string
          time: string
        }
        Update: {
          id?: string
          created_at?: string
          location?: string
          date?: string
          time?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
