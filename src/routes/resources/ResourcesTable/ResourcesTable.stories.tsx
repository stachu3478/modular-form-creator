import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResourcesTable } from './ResourcesTable'
import { GlobalStyles, theme } from '../../../design-system'
import { ThemeProvider } from 'styled-components'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { exampleResources } from './ResourcesTable.mocks'

const meta: Meta<typeof ResourcesTable> = {
  title: 'Components/Resources Table',
  component: ResourcesTable,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={createMemoryRouter([{ path: '/', element: <Story /> }], { initialEntries: ['/'] })} />
      </ThemeProvider>
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
