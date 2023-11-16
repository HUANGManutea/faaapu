import { Season } from "./season";

export interface Plant {
  id: number,
  name: string,
  scientificName: string,
  imageUrl: string,
  family?: string,
  growth?: string,
  foliage?: string,
  shape?: string,
  water?: string,
  lifespan?: string,
  difficulty?: string,
  type?: string,
  bloomSeasons?: Season[],
  harvestSeasons?: Season[],
  pruneSeasons?: Season[],
  plantingSeasons?: Season[],
  usages?: string[],
  lights?: string[],
  plantingMethods?: string[],
  soilHumidities?: string[],
  soilPhs?: string[],
  soilTypes?: string[],
  lowHeight?: number | null,
  highHeight?: number | null,
  lowWidth?: number | null,
  highWidth?: number | null,
  contentUrl?: string | null,
  content?: string
}