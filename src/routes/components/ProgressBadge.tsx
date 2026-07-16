import { Badge } from '../../design-system'

export default function ProgressBadge({ completed }: { completed: boolean }) {
  if (completed) {
    return <Badge variant="success">Completed</Badge>
  }
  return <Badge variant="warning">Incomplete</Badge>
}
