import { createFileRoute } from '@tanstack/react-router'
import { Lock } from '../../views/lock'

export const Route = createFileRoute('/lock/$mint')({
  component: () => <Lock />,
})
