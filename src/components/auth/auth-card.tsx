import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto shadow-2xl border border-slate-800/90 bg-slate-900/70 backdrop-blur-xl rounded-2xl relative overflow-hidden",
        className
      )}
    >
      {/* Top ambient line accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-80" />

      <CardHeader className="space-y-1.5 text-center pt-7 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-slate-400 font-light">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-6 pb-6">{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col space-y-4 pt-0 pb-6 px-6">{footer}</CardFooter>
      )}
    </Card>
  );
}
