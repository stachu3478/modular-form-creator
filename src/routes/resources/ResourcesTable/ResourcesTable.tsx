import { Form, Link } from "react-router";
import type { Resource } from './ResourcesTable.types';

export function ResourcesTable({ resources }: { resources: Resource[] }) {
  if (!resources.length) {
    return (
      <div>
        <p>Resources you create will show up here</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Project name</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
          {resources.map((resource) => (
            <tr key={resource.resourceId} id={String(resource.resourceId)}>
              <td>{resource.name}</td>
              <td>{resource.basicInfo.owner}</td>
              <td>{resource.projectDetails.projectName}</td>
              <td>{resource.projectDetails.category}</td>
              <td>{resource.basicInfo.priority}</td>
              <td>
                <Link to={`${resource.resourceId}/details`}>Details</Link>
                <Form action={`/resources/${resource.resourceId}/delete`} method="POST"><button type="submit">Delete</button></Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
