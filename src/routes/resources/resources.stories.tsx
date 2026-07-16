import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcesPage from './route'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { exampleResources } from '../ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

function createPaginated<T>(items: T[], pageSize = 10, page = 1) {
  return {
    items: items.slice((page - 1) * pageSize, pageSize),
    pagination: {
      page,
      pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize),
    },
  }
}

const submitAction = fn(() => 'Ok!')

const deleteAction = fn(() => 'Ok!')

const meta: Meta<typeof ResourcesPage> = {
  title: 'Page/Resources',
  component: ResourcesPage,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/',
              element: <Story />,
              loader: () => createPaginated(exampleResources),
              action: submitAction,
            },
            {
              path: `/resources/${exampleResources[0].resourceId}/delete`,
              element: <Story />,
              loader: () => createPaginated(exampleResources),
              action: deleteAction,
            },
          ],
          { initialEntries: ['/'] },
        )}
      />
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ResourcesPage>

export const Page: Story = {}

export const PageWithSubmittedResourceName: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Resource name'), 'My resource name')

    await userEvent.click(canvas.getByRole('button', { name: '+ Create new resource' }))

    expect(submitAction).toHaveBeenCalled()
  },
}

export const PageWithRemovedResource: Story = {
  play: async ({ canvas, userEvent }) => {
    const firstResourceDeleteButton = canvas.getAllByRole('button', { name: 'Delete' })[0]
    await userEvent.click(firstResourceDeleteButton)

    expect(deleteAction).toHaveBeenCalled()
  },
}
