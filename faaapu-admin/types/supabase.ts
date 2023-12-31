export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      difficulty: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "difficulty_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "difficulty_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      family: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "family_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      foliage: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "foliage_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "foliage_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      growth: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "growth_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "growth_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lifespan: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lifespan_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifespan_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      light: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "light_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "light_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      plant: {
        Row: {
          content_url: string | null
          created_at: string
          created_by: string | null
          difficulty_id: number
          family_id: number
          foliage_id: number
          growth_id: number
          high_height: number | null
          high_width: number | null
          id: number
          image_url: string
          lifespan_id: number
          low_height: number | null
          low_width: number | null
          name: string
          scientific_name: string
          shape_id: number
          type_id: number
          updated_at: string
          updated_by: string | null
          water_id: number
        }
        Insert: {
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          difficulty_id: number
          family_id: number
          foliage_id: number
          growth_id: number
          high_height?: number | null
          high_width?: number | null
          id?: number
          image_url: string
          lifespan_id: number
          low_height?: number | null
          low_width?: number | null
          name: string
          scientific_name: string
          shape_id: number
          type_id: number
          updated_at?: string
          updated_by?: string | null
          water_id: number
        }
        Update: {
          content_url?: string | null
          created_at?: string
          created_by?: string | null
          difficulty_id?: number
          family_id?: number
          foliage_id?: number
          growth_id?: number
          high_height?: number | null
          high_width?: number | null
          id?: number
          image_url?: string
          lifespan_id?: number
          low_height?: number | null
          low_width?: number | null
          name?: string
          scientific_name?: string
          shape_id?: number
          type_id?: number
          updated_at?: string
          updated_by?: string | null
          water_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_foliage_id_fkey"
            columns: ["foliage_id"]
            isOneToOne: false
            referencedRelation: "foliage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_growth_id_fkey"
            columns: ["growth_id"]
            isOneToOne: false
            referencedRelation: "growth"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_lifespan_id_fkey"
            columns: ["lifespan_id"]
            isOneToOne: false
            referencedRelation: "lifespan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_shape_id_fkey"
            columns: ["shape_id"]
            isOneToOne: false
            referencedRelation: "shape"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_water_id_fkey"
            columns: ["water_id"]
            isOneToOne: false
            referencedRelation: "water"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_bloom_season: {
        Row: {
          plant_id: number
          season_id: number
        }
        Insert: {
          plant_id: number
          season_id: number
        }
        Update: {
          plant_id?: number
          season_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_bloom_season_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_bloom_season_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_harvest_season: {
        Row: {
          plant_id: number
          season_id: number
        }
        Insert: {
          plant_id: number
          season_id: number
        }
        Update: {
          plant_id?: number
          season_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_harvest_season_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_harvest_season_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_light: {
        Row: {
          light_id: number
          plant_id: number
        }
        Insert: {
          light_id: number
          plant_id: number
        }
        Update: {
          light_id?: number
          plant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_light_light_id_fkey"
            columns: ["light_id"]
            isOneToOne: false
            referencedRelation: "light"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_light_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_planting_method: {
        Row: {
          plant_id: number
          planting_method_id: number
        }
        Insert: {
          plant_id: number
          planting_method_id: number
        }
        Update: {
          plant_id?: number
          planting_method_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_planting_method_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_planting_method_planting_method_id_fkey"
            columns: ["planting_method_id"]
            isOneToOne: false
            referencedRelation: "planting_method"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_planting_season: {
        Row: {
          plant_id: number
          season_id: number
        }
        Insert: {
          plant_id: number
          season_id: number
        }
        Update: {
          plant_id?: number
          season_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_planting_season_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_planting_season_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_prune_season: {
        Row: {
          plant_id: number
          season_id: number
        }
        Insert: {
          plant_id: number
          season_id: number
        }
        Update: {
          plant_id?: number
          season_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_prune_season_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_prune_season_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_soil_humidity: {
        Row: {
          plant_id: number
          soil_humidity_id: number
        }
        Insert: {
          plant_id: number
          soil_humidity_id: number
        }
        Update: {
          plant_id?: number
          soil_humidity_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_soil_humidity_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_soil_humidity_soil_humidity_id_fkey"
            columns: ["soil_humidity_id"]
            isOneToOne: false
            referencedRelation: "soil_humidity"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_soil_ph: {
        Row: {
          plant_id: number
          soil_ph_id: number
        }
        Insert: {
          plant_id: number
          soil_ph_id: number
        }
        Update: {
          plant_id?: number
          soil_ph_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_soil_ph_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_soil_ph_soil_ph_id_fkey"
            columns: ["soil_ph_id"]
            isOneToOne: false
            referencedRelation: "soil_ph"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_soil_type: {
        Row: {
          plant_id: number
          soil_type_id: number
        }
        Insert: {
          plant_id: number
          soil_type_id: number
        }
        Update: {
          plant_id?: number
          soil_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_soil_type_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_soil_type_soil_type_id_fkey"
            columns: ["soil_type_id"]
            isOneToOne: false
            referencedRelation: "soil_type"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_usage: {
        Row: {
          plant_id: number
          usage_id: number
        }
        Insert: {
          plant_id: number
          usage_id: number
        }
        Update: {
          plant_id?: number
          usage_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_usage_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_usage_usage_id_fkey"
            columns: ["usage_id"]
            isOneToOne: false
            referencedRelation: "usage"
            referencedColumns: ["id"]
          }
        ]
      }
      planting_method: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "planting_method_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planting_method_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      season: {
        Row: {
          created_at: string
          created_by: string | null
          end_month: number
          id: number
          start_month: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_month: number
          id?: number
          start_month: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_month?: number
          id?: number
          start_month?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "season_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "season_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      shape: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shape_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shape_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      soil_humidity: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soil_humidity_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soil_humidity_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      soil_ph: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soil_ph_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soil_ph_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      soil_type: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "soil_type_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "soil_type_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      type: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "type_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "type_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      usage: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      water: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "water_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "water_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      zone: {
        Row: {
          created_at: string
          id: number
          name: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "zone_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      zone_plant: {
        Row: {
          plant_id: number
          zone_id: number
        }
        Insert: {
          plant_id: number
          zone_id: number
        }
        Update: {
          plant_id?: number
          zone_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "zone_plant_plant_id_fkey"
            columns: ["plant_id"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zone_plant_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zone"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      properties: {
        Row: {
          description: string | null
          id: number | null
          name: string | null
          tablename: string | null
        }
        Relationships: []
      }
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
