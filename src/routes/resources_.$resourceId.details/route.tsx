import { Form, Link, useLoaderData } from 'react-router'
import type { Resource } from '../components/ResourcesTable/ResourcesTable.types'
import { fetchFromApi } from '../loader'
import { Badge, Button, Card } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import { styled } from 'styled-components'
import type { Route } from './+types/route'

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
        <h1>{resource.name}: Summary</h1>

        {resource.status === 'draft' ? (
          <Badge variant="warning">
            This resource is in draft. Fill in the remaining information to be able to
            provision the resource.
          </Badge>
        ) : (
          <Badge variant="info">
            This resource is in provisioning state. You can still modify the subsequent
            modules and save changes.
          </Badge>
        )}

        <h2>Basic info</h2>
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
            <h2>Project details</h2>
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
