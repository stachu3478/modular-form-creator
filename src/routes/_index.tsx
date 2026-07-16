import { Link } from 'react-router'
import { Button } from '../design-system'

export default function HomeRoute() {
  return (
    <div>
      <h1>Home</h1>
      <p>Resource management right at your fingertips!</p>
      <Link to="/resources">
        <Button variant="primary">➔ Go to resources</Button>
      </Link>
    </div>
  )
}
