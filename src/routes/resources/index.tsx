import { useLoaderData } from "react-router";
import { Input } from "../../design-system";
import { NewResourceForm, SubmitButton } from "./index.styles";
import { ResourcesTable } from "./ResourcesTable/ResourcesTable";
import { type Paginated, type Resource } from "./ResourcesTable/ResourcesTable.types";
import { fetchFromApi } from "../loader";
import type { Route } from "./+types";

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

export async function clientLoader(): Promise<Paginated<Resource[]>> {
  const res = await fetchFromApi('/resources');
  const resources = await res.json();
  return resources;
}

function ResourceForm() {
  return (
    <NewResourceForm method="POST">
      <label htmlFor="resource-name-input">Resource name</label>
      <Input id="resource-name-input" type="text" name="resourceName" />
      <SubmitButton type="submit">+ Create new resource</SubmitButton>
    </NewResourceForm>
  )
}

export default function ResourcesPage() {
  const { items } = useLoaderData<Paginated<Resource>>()
  return (
    <div>
      <h1>Resources</h1>
      <ResourceForm />
      <ResourcesTable resources={items} />
    </div>
  )
}
