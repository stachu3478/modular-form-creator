import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcePage from './route'
import { createMemoryRouter, RouterProvider } from 'react-router'
import {
  completeResource,
  filledDraftResource,
  resourceWithIncompleteProjectDetails,
} from '../components/ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

const saveAction = fn(() => 'Ok!')

const resourceLoader = fn(() => completeResource)

const meta: Meta<typeof ResourcePage> = {
  title: 'Page/Resource Project Details',
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
              action: saveAction,
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

export const PageWithIncompleteProjectDetails: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteProjectDetails)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
    expect(canvas.getByTestId('main')).toHaveTextContent('Project Details')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Summary')
  },
}

export const PageWithDirtyProjectDetails: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteProjectDetails)
  },
  play: async ({ canvas, userEvent }) => {
    const budgetField = canvas.getByLabelText('Budget')
    await userEvent.type(budgetField, '50000')

    expect(canvas.getByTestId('main')).toHaveTextContent('Saving...')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}

export const PageWithEditedProjectDetails: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteProjectDetails)
  },
  play: async ({ canvas, userEvent }) => {
    const budgetField = canvas.getByLabelText('Budget')
    await userEvent.type(budgetField, '50000')

    await canvas.findByText('Changes Saved', {}, { timeout: 5000 })

    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}

export const PageWithCompletedProjectDetails: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => filledDraftResource)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
    expect(canvas.getByTestId('main')).toHaveTextContent('Proceed to Summary')
  },
}

export const PageWithCompleteResource: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => completeResource)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
    expect(canvas.getByTestId('main')).toHaveTextContent('Save Changes')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Summary')
  },
}
