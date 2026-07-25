import { Link, useFetcher, useLoaderData } from 'react-router'
import type { Resource } from '../components/ResourcesTable/ResourcesTable.types'
import { Badge, Card, Input, Select } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import type { Route } from './+types/route'
import ProgressBadge from '../components/ProgressBadge'
import ResourceStatusBadge from '../components/ResourceStatusBadge'
import { BackLinkButton } from '../components/styled'
import { capitalize, fetchFromApi, useDebounce } from '../../utils'
import { useState } from 'react'
import { SubmitButton } from './styles'
import FormStatusBadge from '../components/FormStatusBadge'

export async function clientAction({ request, params }: Route.ActionArgs) {
  return fetchFromApi(`/resources/${params.resourceId}/basic-info`, {
    method: 'PATCH',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function clientLoader({ params }: Route.LoaderArgs): Promise<Resource> {
  const res = await fetchFromApi(`/resources/${params.resourceId}`)
  const resources = await res.json()
  return resources
}

type AnyInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export default function ResourcePage() {
  const resource = useLoaderData<Resource>()
  const { isBasicInfoCompleted, isProjectDetailsCompleted } = useBusinessLogic()
  const basicInfoCompleted = isBasicInfoCompleted(resource)
  const projectDetailsCompleted = isProjectDetailsCompleted(resource)
  const [owner, setOwner] = useState(resource.basicInfo.owner)
  const [email, setEmail] = useState(resource.basicInfo.email)
  const [description, setDescription] = useState(resource.basicInfo.description)
  const [priority, setPriority] = useState(resource.basicInfo.priority)
  const [isSaved, setIsSaved] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const fetcher = useFetcher()
  const saveDraft = useDebounce(async (e: AnyInputChangeEvent) => {
    setIsSaving(true)
    await fetcher.submit(e.target.form, { method: 'PATCH' }).finally(() => {
      setIsSaving(false)
    })
    setIsSaved(true)
  }, 3000)

  function handleChange(e: AnyInputChangeEvent) {
    setIsSaved(false)
    if (resource.status === 'draft') {
      saveDraft(e)
    }
  }

  function handleOwnerChange(e: AnyInputChangeEvent) {
    setOwner(e.target.value)
    handleChange(e)
  }

  function handleEmailChange(e: AnyInputChangeEvent) {
    setEmail(e.target.value)
    handleChange(e)
  }

  function handleDescriptionChange(e: AnyInputChangeEvent) {
    setDescription(e.target.value)
    handleChange(e)
  }

  function handlePriorityChange(e: AnyInputChangeEvent) {
    setPriority(e.target.value)
    handleChange(e)
  }

  return (
    <div>
      <Link to={`/resources/${resource.resourceId}`}>
        <BackLinkButton variant="ghost">🠔 Overview</BackLinkButton>
      </Link>
      <Card>
        <h1>{resource.name}: Basic Info</h1>

        <ResourceStatusBadge resource={resource} />

        {fetcher.data?.message && <Badge variant="warning">{fetcher.data.message}</Badge>}

        <fetcher.Form>
          <Input
            label="Resource name"
            value={resource.basicInfo.resourceName}
            state="locked"
            tooltip="Resource name is immutable after creation."
            helperText="This value cannot be changed."
          />
          <input
            type="hidden"
            name="resourceName"
            value={resource.basicInfo.resourceName}
          />
          <br />
          <Input
            label="Owner"
            value={owner}
            onChange={(e) => handleOwnerChange(e)}
            placeholder="John Smith"
            name="owner"
            required
          />
          <br />
          <Input
            label="E-mail"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            placeholder="john.smith@company.com"
            name="email"
            required
          />
          <br />
          <Input
            multiline
            label="Description"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
            placeholder="Tell us about your scope..."
            name="description"
            required
          />
          <br />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => handlePriorityChange(e)}
            options={['low', 'medium', 'high'].map((value) => ({
              label: capitalize(value),
              value,
            }))}
            name="priority"
          />
          <br />
          <FormStatusBadge
            pending={isSaving}
            isSaved={isSaved}
            isDraft={resource.status === 'draft'}
            error={!!fetcher.data?.message}
          />
          <br />

          {resource.status === 'completed' ? (
            <SubmitButton disabled={isSaved} type="submit" fullWidth>
              Save Changes
            </SubmitButton>
          ) : (
            basicInfoCompleted && (
              <Link to={`/resources/${resource.resourceId}/project-details`}>
                <SubmitButton variant="secondary" fullWidth>
                  Proceed to Project Details
                  <ProgressBadge completed={projectDetailsCompleted} />
                </SubmitButton>
              </Link>
            )
          )}
        </fetcher.Form>
      </Card>
    </div>
  )
}
