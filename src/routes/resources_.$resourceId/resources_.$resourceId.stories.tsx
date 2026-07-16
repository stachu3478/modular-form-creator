import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcePage from './route'
import { createMemoryRouter, RouterProvider } from 'react-router'
import {
  completeResource,
  filledDraftResource,
  resourceWithIncompleteBasicInfo,
  resourceWithIncompleteProjectDetails,
} from '../ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

const resourceLoader = fn(() => completeResource)

const meta: Meta<typeof ResourcePage> = {
  title: 'Page/Resource',
  component: ResourcePage,
  decorators: [
    (Story) => (
      <RouterProvider
        router={createMemoryRouter(
          [
            {
              path: '/resources/:resourceId',
              element: (
                <div data-testid="main">
                  <Story />
                </div>
              ),
              loader: resourceLoader,
            },
          ],
          { initialEntries: ['/resources/7'] },
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

export const Page: Story = {}

export const PageWithIncompleteBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteBasicInfo)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Basic info')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Project details')
  },
}

export const PageWithIncompleteProjectDetails: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteProjectDetails)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Project details')

    const provisionButton = canvas.getByRole('button', { name: 'Provision' })
    expect(provisionButton).toBeDisabled()
  },
}

export const PageWithFilledDraftResource: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => filledDraftResource)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Project details')

    const provisionButton = canvas.getByRole('button', { name: 'Provision' })
    expect(provisionButton).not.toBeDisabled()
  },
}

export const PageWithFilledCompletedResource: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => completeResource)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('provisioning state')

    const provisionButton = canvas.queryByRole('button', { name: 'Provision' })
    expect(provisionButton, 'Provision button should not be present').toBeNull()
  },
}
