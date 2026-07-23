import React from "react";

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

export function ResultCard({ title, children }: ResultCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 bg-muted/50 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-4 text-sm text-foreground/80 space-y-2">{children}</div>
    </div>
  );
}
