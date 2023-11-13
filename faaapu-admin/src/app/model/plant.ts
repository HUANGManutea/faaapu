import { Difficulty } from "./difficulty";
import { Family } from "./family";
import { Foliage } from "./foliage";
import { Growth } from "./growth";
import { Lifespan } from "./lifespan";
import { Light } from "./light";
import { PlantingMethod } from "./planting-method";
import { Season } from "./season";
import { Shape } from "./shape";
import { SoilHumidity } from "./soil-humidity";
import { SoilPh } from "./soil-ph";
import { SoilType } from "./soil-type";
import { Type } from "./type";
import { Usage } from "./usage";
import { Water } from "./water";

export interface Plant {
  id: number,
  name: string,
  scientificName: string,
  imageUrl: string,
  family: Family | null,
  growth?: Growth | null,
  foliage?: Foliage | null,
  shape?: Shape | null,
  water?: Water | null,
  lifespan?: Lifespan | null,
  difficulty?: Difficulty | null,
  type?: Type | null,
  usages?: Usage[],
  lights?: Light[],
  bloomSeasons?: Season[],
  harvestSeasons?: Season[],
  pruneSeasons?: Season[],
  plantingSeasons?: Season[],
  plantingMethods?: PlantingMethod[],
  soilHumidities?: SoilHumidity[],
  soilPhs?: SoilPh[],
  soilTypes?: SoilType[],
  lowHeight?: number | null,
  highHeight?: number | null,
  lowWidth?: number | null,
  highWidth?: number | null,
  description?: string | null,
  plantAdvice?: string | null,
  maintenanceAdvice?: string | null,
  info?: string | null,
}