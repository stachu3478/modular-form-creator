import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcePage from './route'
import { createMemoryRouter, RouterProvider } from 'react-router'
import {
  completeResource,
  resourceWithIncompleteBasicInfo,
  resourceWithIncompleteProjectDetails,
} from '../components/ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

const resourceLoader = fn(() => completeResource)

const meta: Meta<typeof ResourcePage> = {
  title: 'Page/Resource Basic Info',
  component: ResourcePage,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/resources/:resourceId/basic-info',
              element: (
                <div data-testid="main">
                  <Story />
                </div>
              ),
              loader: resourceLoader,
            },
          ],
          { initialEntries: ['/resources/7/basic-info'] },
        )}
      />
    ),
  ],
  beforeEach: () => {
    resourceLoader.mockClear()
  },
}

export default meta

type Story = StoryObj<typeof ResourcePage>

export const PageWithIncompleteBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteBasicInfo)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Basic info')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}

export const PageWithCompletedBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteProjectDetails)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Proceed to Project Details')
  },
}
