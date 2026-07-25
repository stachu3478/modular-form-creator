import { useActionData, useLoaderData, useSearchParams } from 'react-router'
import { Badge, Button, Card, Drawer, Input } from '../../design-system'
import { NewResourceButton, NewResourceForm, SearchAndCreateRow, Spacer } from './styles'
import { ResourcesTable } from '../components/ResourcesTable/ResourcesTable'
import {
  type Paginated,
  type Resource,
} from '../components/ResourcesTable/ResourcesTable.types'
import type { Route } from './+types/route'
import { useState } from 'react'
import { fetchFromApi, useDebounce } from '../../utils'

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
  const { items, pagination } = useLoaderData<Paginated<Resource>>()
  const [isNewResourceFormOpen, setNewResourceFormOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [, setSearchParams] = useSearchParams()

  const handleSearchText = useDebounce((e?: AnyInputChangeEvent) => {
    if (!e) {
      return //idk
    }
    setSearchText(e.target.value)
    setSearchParams({ name: e.target.value, page: page.toString(), sortOrder })
  }, 500)

  function handlePage(page: number) {
    setPage(page)
    setSearchParams({ name: searchText, page: page.toString(), sortOrder })
  }

  function handleSortOrder() {
    const newValue = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newValue)
    setSearchParams({ name: searchText, page: page.toString(), sortOrder: newValue })
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
          placeholder="🔍 Search..."
          value={searchText}
          onChange={(e) => handleSearchText(e)}
        />
        <Button variant="secondary" onClick={() => handleSortOrder()}>
          {sortOrder === 'asc' ? 'Newest first' : 'Oldest first'}
        </Button>
        <Spacer />
        <NewResourceButton onClick={() => setNewResourceFormOpen(true)}>
          + Create new resource
        </NewResourceButton>
      </SearchAndCreateRow>

      <ResourcesTable resources={items} />

      {pagination.page > 1 && (
        <Button variant="secondary" onClick={() => handlePage(pagination.page - 1)}>
          Previous page
        </Button>
      )}
      <Spacer />
      {new Array(pagination.totalPages).fill(0).map((_, i) => (
        <Button key={i} variant="ghost" onClick={() => handlePage(i + 1)}>
          {i + 1}
        </Button>
      ))}
      <Spacer />
      {pagination.page < pagination.totalPages && (
        <Button variant="secondary" onClick={() => handlePage(pagination.page + 1)}>
          Next page
        </Button>
      )}
    </Card>
  )
}
