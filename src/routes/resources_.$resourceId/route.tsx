import { Form, Link, useLoaderData } from 'react-router'
import type { Resource } from '../components/ResourcesTable/ResourcesTable.types'
import { Badge, Button, Card, Drawer } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import type { Route } from './+types/route'
import ProgressBadge from '../components/ProgressBadge'
import ResourceStatusBadge from '../components/ResourceStatusBadge'
import { BackLinkButton } from '../components/styled'
import { useState } from 'react'
import { fetchFromApi } from '../../utils'

export async function clientAction({ params }: Route.ActionArgs): Promise<Resource> {
  const res = await fetchFromApi(`/resources/${params.resourceId}/provisioning`, {
    method: 'PATCH',
  })
  const resources = await res.json()
  return resources
}

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
  const fullyCompleted = basicInfoCompleted && projectDetailsCompleted
  const [confirmDrawerOpen, setConfirmDrawerOpen] = useState(false)

  return (
    <div>
      <Link to="/resources">
        <BackLinkButton variant="ghost">🠔 Resources</BackLinkButton>
      </Link>
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
            <Button
              onClick={() => setConfirmDrawerOpen(true)}
              disabled={!fullyCompleted}
              variant="primary"
              fullWidth
            >
              Provision
            </Button>
          </Form>
        )}
      </Card>
      <Drawer
        title="Resource provision confirmation"
        isOpen={confirmDrawerOpen}
        onClose={() => setConfirmDrawerOpen(false)}
      >
        <p>Do you want to provision resource {resource.name}?</p>
        <Badge variant="warning">This action is irreversible!</Badge>
        <Badge variant="info">
          You will be still able to modify the modules and save changes
        </Badge>
        <Form method="POST">
          <Button
            onClick={() => setConfirmDrawerOpen(false)}
            type="submit"
            variant="primary"
            fullWidth
          >
            Confirm Provision
          </Button>
        </Form>
      </Drawer>
    </div>
  )
}
