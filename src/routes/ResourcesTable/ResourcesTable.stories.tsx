import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResourcesTable } from './ResourcesTable'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { exampleResources } from './ResourcesTable.mocks'

const meta: Meta<typeof ResourcesTable> = {
  title: 'Components/Resources Table',
  component: ResourcesTable,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter([{ path: '/', element: <Story /> }], {
          initialEntries: ['/'],
        })}
      />
    ),
  ],
  args: {
    resources: exampleResources,
  },
}

export default meta

type Story = StoryObj<typeof ResourcesTable>

export const TableWithData: Story = {}

export const TableWithoutData: Story = {
  args: { resources: [] },
}
