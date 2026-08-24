"use client";
import * as React from "react";
import { WishForm } from "./wish-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WishSection({ wishes = [], invitationId }: { wishes?: Record<string, any>[], invitationId: string }) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Wish Form */}
        <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
          <h3 className="text-2xl font-heading text-primary mb-6">Kirim Ucapan</h3>
          <WishForm invitationId={invitationId} />
        </div>

        {/* Wish List */}
        <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border flex flex-col max-h-125">
          <h3 className="text-2xl font-heading text-primary mb-6">Ucapan ({wishes.length})</h3>
          <div className="overflow-y-auto pr-4 space-y-6 flex-1">
            {wishes.map(wish => (
              <div key={wish.id} className="border-b border-border pb-4 last:border-0">
                <h4 className="font-bold text-textPrimary">{wish.name}</h4>
                <p className="text-xs text-textMuted mb-2">{new Date(wish.time).toLocaleDateString()}</p>
                <p className="text-textSecondary text-sm">{wish.text}</p>
              </div>
            ))}
            {wishes.length === 0 && <p className="text-center text-textMuted">Belum ada ucapan. Jadilah yang pertama!</p>}
          </div>
        </div>
      </div>
    </section>
  );
}