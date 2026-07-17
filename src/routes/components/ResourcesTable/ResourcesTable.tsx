import { Form, Link } from 'react-router'
import type { Resource } from './ResourcesTable.types'
import { Badge, Button, Drawer } from '../../../design-system'
import {
  ActionsCell,
  DeleteButton,
  Table,
  TableCell,
  TableRow,
} from './ResourcesTable.styles'
import { useState } from 'react'

export function ResourcesTable({ resources }: { resources: Resource[] }) {
  const [deleteConfirmDrawerOpen, setDeleteConfirmDrawerOpen] = useState(false)
  const [resourceToRemove, setResourceToRemove] = useState<Resource>()

  function handleResourceRemovalButton(resource: Resource) {
    setResourceToRemove(resource)
    setDeleteConfirmDrawerOpen(true)
  }

  if (!resources.length) {
    return <Badge variant="neutral">Resources you create will show up here</Badge>
  }

  return (
    <>
      <Table>
        <tbody>
          <TableRow>
            <th>Name</th>
            <th>Owner</th>
            <th>Project name</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Actions</th>
          </TableRow>
          {resources.map((resource) => (
            <TableRow key={resource.resourceId} id={String(resource.resourceId)}>
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.basicInfo.owner}</TableCell>
              <TableCell>{resource.projectDetails.projectName}</TableCell>
              <TableCell>{resource.projectDetails.category}</TableCell>
              <TableCell>{resource.basicInfo.priority}</TableCell>
              <ActionsCell>
                <Link to={`${resource.resourceId}/`}>
                  <Button variant="secondary">View</Button>
                </Link>
                <DeleteButton
                  onClick={() => handleResourceRemovalButton(resource)}
                  variant="secondary"
                >
                  Delete
                </DeleteButton>
              </ActionsCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {resourceToRemove && (
        <Drawer
          title="Resource removal confirmation"
          isOpen={deleteConfirmDrawerOpen}
          onClose={() => setDeleteConfirmDrawerOpen(false)}
        >
          <p>Do you want to remove resource {resourceToRemove.name}?</p>
          <Badge variant="warning">This action is irreversible!</Badge>
          <Form action={`/resources/${resourceToRemove.resourceId}/delete`} method="POST">
            <DeleteButton
              onClick={() => setDeleteConfirmDrawerOpen(false)}
              type="submit"
              variant="secondary"
              fullWidth
            >
              Confirm Removal
            </DeleteButton>
          </Form>
        </Drawer>
      )}
    </>
  )
}
