import { fetchFromApi } from "../loader";
import type { Paginated, Resource } from "./ResourcesTable/ResourcesTable.types";

export async function clientLoader(): Promise<Paginated<Resource[]>> {
  const res = await fetchFromApi('/resources');
  const resources = await res.json();
  return resources;
}
