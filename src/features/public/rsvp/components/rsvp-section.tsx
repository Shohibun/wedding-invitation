"use client";
import * as React from "react";

export function RsvpSection({ invitationId }: { invitationId: string }) {
  return (
    <section className="py-24 px-6 bg-primary text-primaryForeground text-center">
      <h2 className="text-4xl font-heading mb-6">Konfirmasi Kehadiran</h2>
      <p className="mb-12 max-w-xl mx-auto opacity-90">Kehadiran Anda adalah hadiah terindah bagi kami. Mohon konfirmasi kehadiran Anda melalui form di bawah ini.</p>
      <div className="max-w-xl mx-auto bg-background rounded-2xl p-8 text-left text-foreground">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" className="w-full px-4 py-2 rounded-md border border-border bg-surface text-textPrimary" placeholder="Nama Anda" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kehadiran</label>
            <select className="w-full px-4 py-2 rounded-md border border-border bg-surface text-textPrimary">
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah Tamu</label>
            <select className="w-full px-4 py-2 rounded-md border border-border bg-surface text-textPrimary">
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>
          <button type="button" className="w-full py-3 bg-primary text-primaryForeground rounded-md font-bold mt-4 hover:opacity-90">Kirim Konfirmasi</button>
        </form>
      </div>
    </section>
  );
}