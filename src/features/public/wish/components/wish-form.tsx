"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function WishForm({ invitationId }: { invitationId: string }) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Fake submission for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <p className="text-primary font-bold text-lg mb-2">Terima Kasih!</p>
        <p className="text-textSecondary">Ucapan Anda telah berhasil dikirim.</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => setSuccess(false)}
        >
          Kirim Ucapan Lain
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input 
          required 
          placeholder="Nama Anda" 
          name="name" 
          disabled={loading}
          className="w-full bg-background border-border text-textPrimary"
        />
      </div>
      <div>
        <Textarea 
          required 
          placeholder="Berikan ucapan dan doa terbaik Anda..." 
          name="text" 
          rows={4}
          disabled={loading}
          className="w-full bg-background border-border text-textPrimary resize-none"
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {loading ? "Mengirim..." : "Kirim Ucapan"}
      </Button>
    </form>
  );
}
