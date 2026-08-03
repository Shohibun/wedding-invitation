import { ErrorState } from "@/components/shared/error/error-state";
import { Container } from "@/layouts/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container className="flex flex-col items-center">
        <ErrorState
          title="Invitation Not Found"
          message="The invitation you are looking for does not exist or has been removed."
        />
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
