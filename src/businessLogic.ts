import type { Resource } from './routes/components/ResourcesTable/ResourcesTable.types'

const isBasicInfoCompleted = (resource: Resource) =>
  Object.values(resource.basicInfo).every((v) => v)

const isProjectDetailsCompleted = (resource: Resource) =>
  Object.values(resource.projectDetails).every((v) => v)

export const useBusinessLogic = () => ({
  isBasicInfoCompleted,
  isProjectDetailsCompleted,
  isFullyCompleted: (resource: Resource) =>
    isBasicInfoCompleted(resource) && isProjectDetailsCompleted(resource),
})
