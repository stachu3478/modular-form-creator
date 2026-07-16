import { Form, Link } from 'react-router'
import type { Resource } from './ResourcesTable.types'
import { Button } from '../../design-system'
import styled from 'styled-components'

const TableCell = styled.td`
  padding: 1rem;
`

const ActionsCell = styled(TableCell)`
  display: flex;
`

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
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.basicInfo.owner}</TableCell>
              <TableCell>{resource.projectDetails.projectName}</TableCell>
              <TableCell>{resource.projectDetails.category}</TableCell>
              <TableCell>{resource.basicInfo.priority}</TableCell>
              <ActionsCell>
                <Link to={`${resource.resourceId}/`}>
                  <Button variant="secondary">View</Button>
                </Link>
                <Form action={`/resources/${resource.resourceId}/delete`} method="POST">
                  <Button type="submit" variant="secondary">
                    Delete
                  </Button>
                </Form>
              </ActionsCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
