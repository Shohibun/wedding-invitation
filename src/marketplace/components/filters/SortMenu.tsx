import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "newest" | "popular" | "name" | "updated";

export interface SortMenuProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortMenu({ value, onChange }: SortMenuProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
      <SelectTrigger className="w-[180px] bg-card">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
        <SelectItem value="name">Name (A-Z)</SelectItem>
        <SelectItem value="updated">Recently Updated</SelectItem>
      </SelectContent>
    </Select>
  );
}
