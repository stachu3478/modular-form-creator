import { Form, Link, useLoaderData } from 'react-router'
import type { Resource } from '../components/ResourcesTable/ResourcesTable.types'
import { fetchFromApi } from '../loader'
import { Button, Card } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import { styled } from 'styled-components'
import type { Route } from './+types/route'
import ProgressBadge from '../components/ProgressBadge'
import ResourceStatusBadge from '../components/ResourceStatusBadge'

export async function clientLoader({ params }: Route.LoaderArgs): Promise<Resource> {
  const res = await fetchFromApi(`/resources/${params.resourceId}`)
  const resources = await res.json()
  return resources
}

const BackLink = styled(Link)`
  margin: 1rem;
`

export default function ResourcePage() {
  const resource = useLoaderData<Resource>()
  const { isBasicInfoCompleted, isProjectDetailsCompleted } = useBusinessLogic()
  const basicInfoCompleted = isBasicInfoCompleted(resource)
  const projectDetailsCompleted = isProjectDetailsCompleted(resource)
  const fullyCompleted = basicInfoCompleted && projectDetailsCompleted

  return (
    <div>
      <BackLink to="/resources">
        <Button variant="ghost">🠔 Resources</Button>
      </BackLink>
      <Card>
        <h1>{resource.name}</h1>

        <ResourceStatusBadge resource={resource} />

        <Link to="./details">
          <Button variant="secondary" fullWidth>
            Show summary
          </Button>
        </Link>

        <Link to="./basic-info">
          <Button variant="secondary" fullWidth>
            Edit Basic Info
            <ProgressBadge completed={basicInfoCompleted} />
          </Button>
        </Link>

        {basicInfoCompleted && (
          <Link to="./project-details">
            <Button variant="secondary" fullWidth>
              Edit Project Details
              <ProgressBadge completed={projectDetailsCompleted} />
            </Button>
          </Link>
        )}

        {resource.status === 'draft' && (
          <Form>
            <Button disabled={!fullyCompleted} type="submit" variant="primary" fullWidth>
              Provision
            </Button>
          </Form>
        )}
      </Card>
    </div>
  )
}
