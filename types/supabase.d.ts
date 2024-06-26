export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bonuses: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      Levels_Mine: {
        Row: {
          id: number
          level: number
          profit_hour: number
          required_level_id: number | null
          upgrade_cost: number
        }
        Insert: {
          id?: number
          level?: number
          profit_hour?: number
          required_level_id?: number | null
          upgrade_cost?: number
        }
        Update: {
          id?: number
          level?: number
          profit_hour?: number
          required_level_id?: number | null
          upgrade_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "Levels_Mine_required_level_fkey"
            columns: ["required_level_id"]
            isOneToOne: false
            referencedRelation: "Levels_Player"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Levels_Mine_required_level_fkey1"
            columns: ["required_level_id"]
            isOneToOne: false
            referencedRelation: "Levels_Player"
            referencedColumns: ["id"]
          },
        ]
      }
      Levels_Player: {
        Row: {
          energy_available: number
          id: number
          level: number
          name: string
          profit_tap: number
          upgrade_cost: number
        }
        Insert: {
          energy_available?: number
          id?: number
          level?: number
          name?: string
          profit_tap?: number
          upgrade_cost?: number
        }
        Update: {
          energy_available?: number
          id?: number
          level?: number
          name?: string
          profit_tap?: number
          upgrade_cost?: number
        }
        Relationships: []
      }
      Mines: {
        Row: {
          id: number
          name: string
          required_level_id: number | null
        }
        Insert: {
          id?: number
          name?: string
          required_level_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          required_level_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Mines_required_level_fkey"
            columns: ["required_level_id"]
            isOneToOne: false
            referencedRelation: "Levels_Player"
            referencedColumns: ["id"]
          },
        ]
      }
      orcs: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      Player_Mines: {
        Row: {
          id: number
          level_mine_id: number | null
          mine_id: number | null
          player_id: number
        }
        Insert: {
          id?: number
          level_mine_id?: number | null
          mine_id?: number | null
          player_id?: number
        }
        Update: {
          id?: number
          level_mine_id?: number | null
          mine_id?: number | null
          player_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Player_Mines_level_mine_id_fkey"
            columns: ["level_mine_id"]
            isOneToOne: false
            referencedRelation: "Levels_Mine"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Player_Mines_mine_id_fkey"
            columns: ["mine_id"]
            isOneToOne: false
            referencedRelation: "Mines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Player_Mines_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "Players"
            referencedColumns: ["id"]
          },
        ]
      }
      Players: {
        Row: {
          created_at: string | null
          honey_latest: number
          honey_max: number
          id: number
          last_login: string | null
          last_logout: string | null
          level_id: number | null
          referred_by_id: number | null
          tg_id: number
          tg_is_premium: boolean
          tg_username: string | null
        }
        Insert: {
          created_at?: string | null
          honey_latest?: number
          honey_max?: number
          id?: number
          last_login?: string | null
          last_logout?: string | null
          level_id?: number | null
          referred_by_id?: number | null
          tg_id?: number
          tg_is_premium?: boolean
          tg_username?: string | null
        }
        Update: {
          created_at?: string | null
          honey_latest?: number
          honey_max?: number
          id?: number
          last_login?: string | null
          last_logout?: string | null
          level_id?: number | null
          referred_by_id?: number | null
          tg_id?: number
          tg_is_premium?: boolean
          tg_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Players_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "Levels_Player"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Players_referred_by_id_fkey"
            columns: ["referred_by_id"]
            isOneToOne: false
            referencedRelation: "Referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          id: number
          link: string
          reward: number
          terms: string
        }
        Insert: {
          id?: number
          link: string
          reward: number
          terms: string
        }
        Update: {
          id?: number
          link?: string
          reward?: number
          terms?: string
        }
        Relationships: []
      }
      ranks: {
        Row: {
          bonus_amount: number
          description: string
          id: number
          name: string
          required_amount: number
        }
        Insert: {
          bonus_amount: number
          description: string
          id?: number
          name: string
          required_amount: number
        }
        Update: {
          bonus_amount?: number
          description?: string
          id?: number
          name?: string
          required_amount?: number
        }
        Relationships: []
      }
      Referrals: {
        Row: {
          code: string
          created_at: string | null
          id: number
          referral_id: number | null
        }
        Insert: {
          code?: string
          created_at?: string | null
          id?: number
          referral_id?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          referral_id?: number | null
        }
        Relationships: []
      }
      Referrals_Early_Bonuses: {
        Row: {
          common: number | null
          honey: number | null
          id: number
          multiplier: number | null
          player_id: number | null
          premium: number | null
        }
        Insert: {
          common?: number | null
          honey?: number | null
          id?: number
          multiplier?: number | null
          player_id?: number | null
          premium?: number | null
        }
        Update: {
          common?: number | null
          honey?: number | null
          id?: number
          multiplier?: number | null
          player_id?: number | null
          premium?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Early_Bonuses_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "Players"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          balance: number
          created_at: string
          id: number
          id_tg: number
          premium: boolean
          rank_id: number
          referrer_id: number | null
          username: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: number
          id_tg: number
          premium?: boolean
          rank_id?: number
          referrer_id?: number | null
          username?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          id?: number
          id_tg?: number
          premium?: boolean
          rank_id?: number
          referrer_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_rank_id_fkey"
            columns: ["rank_id"]
            isOneToOne: false
            referencedRelation: "ranks"
            referencedColumns: ["id"]
          },
        ]
      }
      users_bonuses: {
        Row: {
          available: boolean
          bonus_id: number
          user_id: number
        }
        Insert: {
          available?: boolean
          bonus_id: number
          user_id: number
        }
        Update: {
          available?: boolean
          bonus_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_bonuses_bonus_id_fkey"
            columns: ["bonus_id"]
            isOneToOne: false
            referencedRelation: "bonuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_bonuses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_orcs: {
        Row: {
          orc_id: number
          user_id: number
        }
        Insert: {
          orc_id: number
          user_id: number
        }
        Update: {
          orc_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_orcs_orc_id_fkey"
            columns: ["orc_id"]
            isOneToOne: false
            referencedRelation: "orcs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_orcs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_quests: {
        Row: {
          completed: boolean
          quest_id: number
          user_id: number
        }
        Insert: {
          completed?: boolean
          quest_id: number
          user_id: number
        }
        Update: {
          completed?: boolean
          quest_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
