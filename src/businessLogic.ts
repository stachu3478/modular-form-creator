import type { Resource } from './routes/ResourcesTable/ResourcesTable.types'

export const useBusinessLogic = () => ({
  isBasicInfoCompleted: (resource: Resource) =>
    Object.values(resource.basicInfo).every((v) => v),
  isProjectDetailsCompleted: (resource: Resource) =>
    Object.values(resource.projectDetails).every((v) => v),
})
