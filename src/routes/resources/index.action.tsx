import { fetchFromApi } from "../loader";
import type { Route } from "../+types/resources";

export async function clientAction({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const response = await fetchFromApi('/resources', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response;
}
