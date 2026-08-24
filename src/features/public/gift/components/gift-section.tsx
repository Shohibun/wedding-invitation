"use client";
import * as React from "react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GiftSection({ gifts = [] }: { gifts?: Record<string, any>[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  if (!gifts || gifts.length === 0) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-24 px-6 bg-surface text-center">
      <h2 className="text-4xl font-heading text-primary mb-6">Wedding Gift</h2>
      <p className="text-textSecondary mb-12 max-w-2xl mx-auto">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {gifts.map(gift => (
          <div key={gift.id} className="bg-background p-6 rounded-2xl shadow-sm border border-border">
            <h4 className="text-lg font-bold text-textPrimary mb-2">{gift.bank}</h4>
            <p className="text-2xl font-mono text-primary tracking-wider mb-2">{gift.accountNumber}</p>
            <p className="text-sm text-textSecondary mb-6">a.n {gift.accountName}</p>
            <button 
              onClick={() => copyToClipboard(gift.accountNumber, gift.id)}
              className="px-6 py-2 bg-secondary text-secondaryForeground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              {copied === gift.id ? "Berhasil Disalin" : "Salin Rekening"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}