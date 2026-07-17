import { redirect } from 'react-router'
import type { Route } from './+types/resources_.$resourceId_.delete'
import { fetchFromApi } from '../utils'

export async function clientAction({ params }: Route.ActionArgs) {
  await fetchFromApi(`/resources/${params.resourceId}`, {
    method: 'DELETE',
  })
  throw redirect('/resources')
}
