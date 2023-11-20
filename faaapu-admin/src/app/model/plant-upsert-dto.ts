export interface PlantUpsertDto {
  id?: number,
  name: string,
  scientificName: string,
  imageUrl: string,
  familyId: number,
  growthId: number,
  foliageId: number,
  shapeId: number,
  waterId: number,
  lifespanId: number,
  difficultyId: number,
  typeId: number,

  usageIds: number[],
  lightIds: number[],
  plantingMethodIds: number[],
  soilHumiditieIds: number[],
  soilPhIds: number[],
  soilTypeIds: number[],
  
  lowHeight?: number,
  highHeight?: number,
  lowWidth?: number,
  highWidth?: number,

  bloomSeasonIds: number[],
  harvestSeasonIds: number[],
  pruneSeasonIds: number[],
  plantingSeasonIds: number[],

  contentUrl?: string,
}