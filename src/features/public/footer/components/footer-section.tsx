"use client";
import * as React from "react";

export function FooterSection({ title }: { title: string }) {
  return (
    <footer className="py-12 bg-surface text-center border-t border-border">
      <h3 className="text-2xl font-heading text-primary mb-4">{title}</h3>
      <p className="text-textSecondary text-sm">Made with Love using Wedding Invitation Platform</p>
    </footer>
  );
}