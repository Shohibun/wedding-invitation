import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface PasswordStrengthProps {
  password?: string;
  className?: string;
}

export function PasswordStrength({ password = "", className }: PasswordStrengthProps) {
  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s += 1;
    if (/[A-Z]/.test(password)) s += 1;
    if (/[a-z]/.test(password)) s += 1;
    if (/[0-9]/.test(password)) s += 1;
    if (/[^A-Za-z0-9]/.test(password)) s += 1;
    return s;
  }, [password]);

  const strengthLabel = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"][score];

  const getColor = (index: number) => {
    if (index >= score) return "bg-muted";
    if (score <= 2) return "bg-destructive";
    if (score === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn("h-full flex-1 transition-colors duration-300", getColor(index))}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-right">{strengthLabel}</p>
    </div>
  );
}
