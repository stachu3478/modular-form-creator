import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcesPage from './index'
import { GlobalStyles, theme } from '../../design-system'
import { ThemeProvider } from 'styled-components'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { exampleResources } from './ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

function createPaginated<T>(items: T[], pageSize = 10, page = 1) {
  return {
    items: items.slice(page * pageSize, pageSize),
    pagination: {
      page,
      pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize)
    }
  }
}

const submitAction = fn(() => "Ok!")

const meta: Meta<typeof ResourcesPage> = {
  title: 'Page/Resources',
  component: ResourcesPage,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={
          createMemoryRouter(
            [{ path: '/', element: <Story />, loader: () => Promise.resolve(createPaginated(exampleResources)), action: submitAction }],
            { initialEntries: ['/'] },
          )
        } />
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ResourcesPage>

export const Page: Story = {}

export const PageWithSubmittedResourceName: Story = {
  play: async ({ canvas, userEvent }) => {
    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByLabelText('Resource name'), 'My resource name');

    await userEvent.click(canvas.getByRole('button'));

    expect(submitAction).toHaveBeenCalled()
  }
}
