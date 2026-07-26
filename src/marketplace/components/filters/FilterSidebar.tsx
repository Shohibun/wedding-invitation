import React from "react";

export interface FilterSidebarProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

export function FilterSidebar({ selectedTags, onTagToggle, availableTags }: FilterSidebarProps) {
  return (
    <div className="w-64 shrink-0 flex flex-col gap-6 p-4 border rounded-xl bg-card">
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
          Popular Tags
        </h3>
        <div className="flex flex-col gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => onTagToggle(tag)}
                  className="rounded border-input text-primary focus:ring-primary"
                />
                <span
                  className={`text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}
                >
                  {tag}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Space for future filters like Engine Version or Author */}
    </div>
  );
}
