"use client";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StorySection({ stories = [] }: { stories?: Record<string, any>[] }) {
  if (!stories || stories.length === 0) return null;
  return (
    <section className="py-24 px-6 bg-background">
      <h2 className="text-4xl font-heading text-center text-primary mb-16">Kisah Cinta</h2>
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-primary/20 before:to-transparent">
        {stories.map((story, i) => (
          <div key={story.id} className="relative pl-8 md:pl-0">
            <div className="hidden md:block absolute left-1/2 -ml-px top-0 bottom-0 w-0.5 bg-border" />
            <div className={`md:flex items-center justify-between w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="order-1 md:w-5/12" />
              <div className="z-20 flex items-center order-1 bg-primary w-4 h-4 rounded-full shadow-xl absolute left-0 md:left-1/2 md:-ml-2 top-2 md:top-auto" />
              <div className="order-1 bg-surface p-6 rounded-xl shadow-sm border border-border md:w-5/12 ml-6 md:ml-0">
                <p className="text-sm font-bold text-primary mb-2">{story.date}</p>
                <h3 className="text-xl font-semibold text-textPrimary mb-2">{story.title}</h3>
                <p className="text-textSecondary leading-relaxed text-sm">{story.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}