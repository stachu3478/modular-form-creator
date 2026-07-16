import { Link, useLoaderData } from 'react-router'
import type { Resource } from '../components/ResourcesTable/ResourcesTable.types'
import { fetchFromApi } from '../loader'
import { Card } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import type { Route } from './+types/route'
import ProgressBadge from '../components/ProgressBadge'
import ResourceStatusBadge from '../components/ResourceStatusBadge'
import { BackLinkButton, EnhancedHeading } from './styled'

export async function clientLoader({ params }: Route.LoaderArgs): Promise<Resource> {
  const res = await fetchFromApi(`/resources/${params.resourceId}`)
  const resources = await res.json()
  return resources
}

export default function ResourcePage() {
  const resource = useLoaderData<Resource>()
  const { isBasicInfoCompleted, isProjectDetailsCompleted } = useBusinessLogic()
  const basicInfoCompleted = isBasicInfoCompleted(resource)
  const projectDetailsCompleted = isProjectDetailsCompleted(resource)

  return (
    <div>
      <Link to={`/resources/${resource.resourceId}`}>
        <BackLinkButton variant="ghost">🠔 Overview</BackLinkButton>
      </Link>
      <Card>
        <h1>{resource.name}: Summary</h1>

        <ResourceStatusBadge resource={resource} />

        <EnhancedHeading>
          <h2>Basic info</h2>
          <ProgressBadge completed={basicInfoCompleted} />
        </EnhancedHeading>

        <h3>Resource name</h3>
        <p>{resource.basicInfo.resourceName}</p>
        <h3>Owner</h3>
        <p>{resource.basicInfo.owner}</p>
        <h3>E-mail</h3>
        <p>{resource.basicInfo.email}</p>
        <h3>Priority</h3>
        <p>{resource.basicInfo.priority}</p>
        <h3>Description</h3>
        <p>{resource.basicInfo.description}</p>

        {basicInfoCompleted && (
          <>
            <EnhancedHeading>
              <h2>Project details</h2>
              <ProgressBadge completed={projectDetailsCompleted} />
            </EnhancedHeading>
            <h3>Project name</h3>
            <p>{resource.projectDetails.projectName}</p>
            <h3>Category</h3>
            <p>{resource.projectDetails.category}</p>
            <h3>Bugdet</h3>
            <p>{resource.projectDetails.budget}</p>
            <h3>Options</h3>
            <ul>
              {resource.projectDetails.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </div>
  )
}
