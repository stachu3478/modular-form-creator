import { useBusinessLogic } from '../../businessLogic'
import { Badge } from '../../design-system'
import type { Resource } from './ResourcesTable/ResourcesTable.types'

export default function ResourceStatusBadge({ resource }: { resource: Resource }) {
  const { isFullyCompleted } = useBusinessLogic()
  if (resource.status === 'draft') {
    if (isFullyCompleted(resource)) {
      return (
        <Badge variant="warning">
          This resource is in draft. Go to Overview page to provision the resource.
        </Badge>
      )
    }
    return (
      <Badge variant="neutral">
        This resource is in draft. Fill in the remaining information to be able to
        provision the resource.
      </Badge>
    )
  }
  return (
    <Badge variant="info">
      This resource is in provisioning state. You can still modify the subsequent modules
      and save changes.
    </Badge>
  )
}
