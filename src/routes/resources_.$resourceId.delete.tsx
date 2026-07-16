import { redirect } from 'react-router'
import { fetchFromApi } from './loader'
import type { Route } from './+types/resources_.$resourceId.delete'

export async function clientAction({ params }: Route.ActionArgs) {
  const response = await fetchFromApi(`/resources/${params.resourceId}`, {
    method: 'DELETE',
  })
  redirect('/resources')
  return response
}
