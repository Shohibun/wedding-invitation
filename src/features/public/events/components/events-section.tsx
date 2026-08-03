"use client";
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EventsSection({ events = [] }: { events?: Record<string, any>[] }) {
  return (
    <section className="py-24 px-6 bg-background">
      <h2 className="text-4xl font-heading text-center text-primary mb-16">Acara Pernikahan</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-surface p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-textPrimary mb-4">{event.name}</h3>
            <p className="text-textSecondary mb-2 font-medium">{new Date(event.date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <p className="text-textMuted mb-6">Pukul {new Date(event.date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - Selesai</p>
            <p className="font-semibold text-textPrimary mb-1">{event.locationName}</p>
            <p className="text-sm text-textSecondary mb-6">{event.address}</p>
            {event.mapUrl && (
              <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-primary text-primaryForeground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                Buka Peta Lokasi
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}