import { Badge } from '../../design-system'

export default function FormStatusBadge({
  isSaved,
  pending,
  isDraft,
  error,
}: {
  isSaved: boolean
  pending: boolean
  isDraft: boolean
  error: boolean
}) {
  if (error) {
    return (
      <Badge variant="warning">
        Changes not saved. Fix errors above before continuing.
      </Badge>
    )
  } else if (isSaved) {
    return <Badge variant="success">Changes Saved</Badge>
  } else if (pending || isDraft) {
    return <Badge variant="info">Saving...</Badge>
  }
  return (
    <Badge variant="warning">
      Changes not saved. Click "Save Changes" to persist your edits.
    </Badge>
  )
}
