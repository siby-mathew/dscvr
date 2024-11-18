import { createFileRoute } from '@tanstack/react-router';
import BubbleMap from '../../views/bubblemap';

export const Route = createFileRoute('/bubblemap/')({
  component: () => <BubbleMap />,
});
