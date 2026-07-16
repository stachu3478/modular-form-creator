import { useLoaderData } from "react-router"
import type { Resource } from "./resources/ResourcesTable/ResourcesTable.types";
import { fetchFromApi } from "./loader";
import type { Route } from "./resources/+types";

export async function clientLoader({ params }: Route.LoaderArgs): Promise<Resource> {
  const res = await fetchFromApi(`/resources/${params.resourceId}`);
  const resources = await res.json();
  return resources;
}

export default function ResourcePage() {
  const resource = useLoaderData()
  return (
    <div>
      <h1>{resource.resourceName}</h1>
    </div>
  )
}