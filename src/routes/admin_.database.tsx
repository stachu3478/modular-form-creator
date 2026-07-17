import { redirect } from 'react-router'
import { fetchFromApi } from '../utils'

export async function clientAction() {
  await fetchFromApi(`/admin/database`, {
    method: 'DELETE',
  })
  throw redirect('/')
}
