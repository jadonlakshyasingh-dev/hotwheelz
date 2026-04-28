import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy /auth route — keep for backward compatibility, redirect to /signin.
export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/signin" });
  },
  component: () => null,
});
