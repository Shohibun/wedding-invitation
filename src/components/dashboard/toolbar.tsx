import * as React from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SearchBar({
  className,
  placeholder = "Search...",
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className={cn("relative w-full md:w-64", className)}>
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full bg-background pl-8"
        {...props}
      />
    </div>
  );
}

export function Toolbar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
      {children}
    </div>
  );
}
