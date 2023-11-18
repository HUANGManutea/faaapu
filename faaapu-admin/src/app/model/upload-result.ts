export interface UploadResult {
  familyId?: number,
  imageUrl?: string,
  shapeId?: number,
  typeId?: number,
  usageIds?: number[],
  bloomSeasonIds?: number[],
  harvestSeasonIds?: number[],
  pruneSeasonIds?: number[],
  plantingSeasonIds?: number[],
  contentUrl?: string,
  error?: string
}