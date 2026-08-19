import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/activate')( {
  component: ActivatePage,
});

function ActivatePage() {
  return (
    <div>
      <h1>Activate</h1>
      <p>Activation page</p>
    </div>
  );
}
