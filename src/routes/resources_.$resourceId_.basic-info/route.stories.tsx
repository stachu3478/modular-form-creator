import type { Meta, StoryObj } from '@storybook/react-vite'
import ResourcePage from './route'
import { createMemoryRouter, RouterProvider } from 'react-router'
import {
  completeResource,
  resourceWithIncompleteBasicInfo,
  resourceWithIncompleteProjectDetails,
} from '../components/ResourcesTable/ResourcesTable.mocks'
import { expect, fn } from 'storybook/test'

const saveAction = fn(() => 'Ok!')

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

export const PageWithIncompleteBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteBasicInfo)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Basic Info')
    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}

export const PageWithDirtyBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteBasicInfo)
  },
  play: async ({ canvas, userEvent }) => {
    const emailField = canvas.getByLabelText('E-mail')
    await userEvent.type(emailField, 'john.doe@hmail.com')

    expect(canvas.getByTestId('main')).toHaveTextContent('Saving...')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}

export const PageWithEditedBasicInfo: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => resourceWithIncompleteBasicInfo)
  },
  play: async ({ canvas, userEvent }) => {
    const emailField = canvas.getByLabelText('E-mail')
    await userEvent.type(emailField, 'john.doe@hmail.com')
    await userEvent.hover(emailField)

    await canvas.findByText('Changes Saved', {}, { timeout: 5000 })

    expect(canvas.getByTestId('main')).toHaveTextContent('Changes Saved')
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

export const PageWithCompleteResource: Story = {
  beforeEach: () => {
    resourceLoader.mockImplementation(() => completeResource)
  },
  play: async ({ canvas }) => {
    expect(canvas.getByTestId('main')).toHaveTextContent('Save Changes')
    expect(canvas.getByTestId('main')).not.toHaveTextContent('Proceed to Project Details')
  },
}
