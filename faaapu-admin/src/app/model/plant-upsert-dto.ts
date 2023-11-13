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

export interface PlantUpsertDto {
  id?: number,
  name: string,
  scientificName: string,
  imageUrl: string,
  family: Family | null
}