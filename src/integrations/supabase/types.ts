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
      achievements: {
        Row: {
          badge_color: string
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Insert: {
          badge_color?: string
          category: string
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Update: {
          badge_color?: string
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
        }
        Relationships: []
      }
      body_measurements: {
        Row: {
          id: string
          measured_at: string
          measurement_type: string
          unit: string
          user_id: string
          value: number
        }
        Insert: {
          id?: string
          measured_at?: string
          measurement_type: string
          unit?: string
          user_id: string
          value: number
        }
        Update: {
          id?: string
          measured_at?: string
          measurement_type?: string
          unit?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      daily_completions: {
        Row: {
          completed_at: string
          day: number
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          day: number
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          day?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_workout_windows: {
        Row: {
          created_at: string | null
          date: string
          end_time: string
          id: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          start_time: string
        }
        Update: {
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          start_time?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number
          created_at: string
          current_day: number
          date_of_birth: string | null
          email: string | null
          gender: string | null
          has_seen_tutorial: boolean | null
          id: string
          last_activity_date: string | null
          last_workout_date: string | null
          name: string
          profile_picture_url: string | null
          routine: string
          routine_changed_at: string | null
          streak: number
          updated_at: string
          user_id: string
          weight: number
          weight_updated_at: string | null
        }
        Insert: {
          age: number
          created_at?: string
          current_day?: number
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          has_seen_tutorial?: boolean | null
          id?: string
          last_activity_date?: string | null
          last_workout_date?: string | null
          name: string
          profile_picture_url?: string | null
          routine: string
          routine_changed_at?: string | null
          streak?: number
          updated_at?: string
          user_id: string
          weight: number
          weight_updated_at?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          current_day?: number
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          has_seen_tutorial?: boolean | null
          id?: string
          last_activity_date?: string | null
          last_workout_date?: string | null
          name?: string
          profile_picture_url?: string | null
          routine?: string
          routine_changed_at?: string | null
          streak?: number
          updated_at?: string
          user_id?: string
          weight?: number
          weight_updated_at?: string | null
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          caption: string | null
          created_at: string
          day_number: number
          id: string
          photo_url: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          day_number: number
          id?: string
          photo_url: string
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          day_number?: number
          id?: string
          photo_url?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reviews: {
        Row: {
          created_at: string
          email: string | null
          id: string
          newsletter_signup: boolean
          rating: number
          review_text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          newsletter_signup?: boolean
          rating: number
          review_text?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          newsletter_signup?: boolean
          rating?: number
          review_text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workout_intensity: {
        Row: {
          created_at: string
          day: number
          difficulty_rating: number | null
          id: string
          notes: string | null
          perceived_exertion: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          day: number
          difficulty_rating?: number | null
          id?: string
          notes?: string | null
          perceived_exertion?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          day?: number
          difficulty_rating?: number | null
          id?: string
          notes?: string | null
          perceived_exertion?: number | null
          user_id?: string
        }
        Relationships: []
      }
      workout_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          day: number
          exercise_name: string
          id: string
          sets_completed: number
          user_id: string
          weight_used: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          day: number
          exercise_name: string
          id?: string
          sets_completed?: number
          user_id: string
          weight_used?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          day?: number
          exercise_name?: string
          id?: string
          sets_completed?: number
          user_id?: string
          weight_used?: number | null
        }
        Relationships: []
      }
      workout_reminders: {
        Row: {
          created_at: string | null
          id: string
          reminder_date: string
          sent_at: string | null
          user_id: string
          workout_completed: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reminder_date: string
          sent_at?: string | null
          user_id: string
          workout_completed?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reminder_date?: string
          sent_at?: string | null
          user_id?: string
          workout_completed?: boolean | null
        }
        Relationships: []
      }
      workout_sessions: {
        Row: {
          created_at: string
          days_completed: number
          end_date: string | null
          id: string
          routine: string
          start_date: string
          streak_achieved: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days_completed?: number
          end_date?: string | null
          id?: string
          routine: string
          start_date: string
          streak_achieved?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          days_completed?: number
          end_date?: string | null
          id?: string
          routine?: string
          start_date?: string
          streak_achieved?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      leaderboard: {
        Row: {
          name: string | null
          rank: number | null
          routine: string | null
          streak: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_complete_workout_today: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      check_and_award_achievements: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      get_current_workout_window: {
        Args: Record<PropertyKey, never>
        Returns: {
          current_date_ist: string
          window_start: string
          window_end: string
        }[]
      }
      reset_inactive_user_streaks: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
