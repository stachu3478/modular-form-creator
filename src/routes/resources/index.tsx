import { useLoaderData } from "react-router";
import { Input } from "../../design-system";
import { NewResourceForm, SubmitButton } from "./index.styles";
import { ResourcesTable } from "./ResourcesTable/ResourcesTable";
import { type Paginated, type Resource } from "./ResourcesTable/ResourcesTable.types";

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
