import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')( {
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>Welcome to ECHO</h1>
      <p>Home page</p>
    </div>
  );
}
