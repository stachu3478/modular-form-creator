import { Link, useFetcher, useLoaderData } from 'react-router'
import type {
  Resource,
  TeamMember,
} from '../components/ResourcesTable/ResourcesTable.types'
import { Badge, Card, CheckboxGroup, Input, Select } from '../../design-system'
import { useBusinessLogic } from '../../businessLogic'
import type { Route } from './+types/route'
import ResourceStatusBadge from '../components/ResourceStatusBadge'
import { BackLinkButton } from '../components/styled'
import { capitalize, fetchFromApi, formDataToObject, useDebounce } from '../../utils'
import { useState } from 'react'
import { SubmitButton } from './styles'
import FormStatusBadge from '../components/FormStatusBadge'

export async function clientAction({ request, params }: Route.ActionArgs) {
  return fetchFromApi(`/resources/${params.resourceId}/project-details`, {
    method: 'PATCH',
    body: JSON.stringify(
      formDataToObject(await request.formData(), { checkBoxFields: ['options'] }),
    ),
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
  const { isProjectDetailsCompleted } = useBusinessLogic()
  const projectDetailsCompleted = isProjectDetailsCompleted(resource)
  const [projectName, setProjectName] = useState(resource.projectDetails.projectName)
  const [category, setCategory] = useState(resource.projectDetails.category)
  const [budget, setBudget] = useState(resource.projectDetails.budget)
  const [options, setOptions] = useState(resource.projectDetails.options)
  const [form, setForm] = useState<HTMLFormElement>()
  const [isSaved, setIsSaved] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const fetcher = useFetcher()
  const saveDraft = useDebounce(async () => {
    if (!form) {
      return false
    }
    setIsSaving(true)
    await fetcher.submit(form, { method: 'PATCH' }).finally(() => {
      setIsSaving(false)
    })
    setIsSaved(true)
  }, 3000)

  function handleChange(e?: AnyInputChangeEvent) {
    setIsSaved(false)
    if (e?.target.form) {
      setForm(e.target.form)
    }
    if (resource.status === 'draft' && form) {
      saveDraft()
    }
  }

  function handleProjectNameChange(e: AnyInputChangeEvent) {
    setProjectName(e.target.value)
    handleChange(e)
  }

  function handleCategoryChange(e: AnyInputChangeEvent) {
    setCategory(e.target.value)
    handleChange(e)
  }

  function handleBudgetChange(e: AnyInputChangeEvent) {
    setBudget(e.target.value)
    handleChange(e)
  }

  function handleOptionsChange(val: TeamMember[]) {
    setOptions(val)
    handleChange()
  }

  return (
    <div>
      <Link to={`/resources/${resource.resourceId}`}>
        <BackLinkButton variant="ghost">🠔 Overview</BackLinkButton>
      </Link>
      <Card>
        <h1>{resource.name}: Project Details</h1>

        <ResourceStatusBadge resource={resource} />

        {fetcher.data?.message && <Badge variant="warning">{fetcher.data.message}</Badge>}

        <fetcher.Form>
          <Input
            label="Project name"
            value={projectName}
            onChange={(e) => handleProjectNameChange(e)}
            name="projectName"
            required
          />
          <br />
          <Select
            label="Category"
            value={category}
            onChange={(e) => handleCategoryChange(e)}
            options={['internal', 'external', 'vendor'].map((value) => ({
              label: capitalize(value),
              value,
            }))}
            name="category"
          />
          <br />
          <Input
            label="Budget"
            value={budget}
            onChange={(e) => handleBudgetChange(e)}
            placeholder="50000"
            tooltip="Only numbers are allowed."
            helperText="Type the budget value in USD dollars ($)."
            name="budget"
            type="number"
            required
          />
          <br />
          <CheckboxGroup
            label="Options"
            value={options}
            onChange={(e) => handleOptionsChange(e as TeamMember[])}
            options={
              [
                'FE devs',
                'BE devs',
                'Designer',
                'Data Eng',
                'Product Owner',
              ] satisfies TeamMember[]
            }
          />
          {options.map((o) => (
            <input type="hidden" key={o} value={o} name="options" />
          ))}
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
            projectDetailsCompleted && (
              <Link to={`/resources/${resource.resourceId}/details`}>
                <SubmitButton variant="secondary" fullWidth>
                  Proceed to Summary
                </SubmitButton>
              </Link>
            )
          )}
        </fetcher.Form>
      </Card>
    </div>
  )
}
