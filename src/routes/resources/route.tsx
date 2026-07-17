import { useActionData, useLoaderData, useSearchParams } from 'react-router'
import { Badge, Button, Card, Drawer, Input } from '../../design-system'
import { NewResourceButton, NewResourceForm, SearchAndCreateRow } from './styles'
import { ResourcesTable } from '../components/ResourcesTable/ResourcesTable'
import {
  type Paginated,
  type Resource,
} from '../components/ResourcesTable/ResourcesTable.types'
import type { Route } from './+types/route'
import { useState } from 'react'
import { fetchFromApi } from '../../utils'

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const response = await fetchFromApi('/resources', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export async function clientLoader({
  request,
}: Route.LoaderArgs): Promise<Paginated<Resource[]>> {
  const url = new URL(request.url)
  const query = url.searchParams.toString()
  const res = await fetchFromApi(`/resources?${query}`)
  const resources = await res.json()
  return resources
}

function ResourceForm() {
  return (
    <NewResourceForm method="post">
      <Input
        label="Resource name"
        id="resource-name-input"
        tooltip="Resource name is immutable after creation."
        type="text"
        name="resourceName"
      />
      <Button type="submit">Create new resource</Button>
    </NewResourceForm>
  )
}

type AnyInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export default function ResourcesPage() {
  const { items } = useLoaderData<Paginated<Resource>>()
  const [isNewResourceFormOpen, setNewResourceFormOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [, setSearchParams] = useSearchParams()

  function handleSearchText(e: AnyInputChangeEvent) {
    setSearchText(e.target.value)
    setSearchParams({ name: e.target.value })
  }

  const createdResource: Resource | undefined = useActionData()

  return (
    <Card>
      <h1>Resources</h1>

      {createdResource && (
        <Badge variant="success">
          Resource {createdResource.name} has been created successfully.
        </Badge>
      )}

      <Drawer
        title="New resource"
        isOpen={isNewResourceFormOpen}
        onClose={() => setNewResourceFormOpen(false)}
      >
        <ResourceForm />
      </Drawer>

      <SearchAndCreateRow>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => handleSearchText(e)}
        />
        <NewResourceButton onClick={() => setNewResourceFormOpen(true)}>
          + Create new resource
        </NewResourceButton>
      </SearchAndCreateRow>

      <ResourcesTable resources={items} />
    </Card>
  )
}
