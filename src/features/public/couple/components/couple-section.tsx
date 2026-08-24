"use client";
import * as React from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CoupleSection({ groom, bride }: { groom?: any; bride?: any }) {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-center">
        {groom && (
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {groom.photoUrl && <img src={groom.photoUrl} alt="Groom" className="w-48 h-48 rounded-full mx-auto object-cover mb-6 shadow-lg border-4 border-background" />}
            <h3 className="text-3xl font-heading text-primary mb-2">{groom.fullName}</h3>
            <p className="text-textSecondary mb-4">{groom.parents}</p>
            {groom.instagram && <p className="text-textMuted text-sm">@{groom.instagram}</p>}
          </motion.div>
        )}
        {bride && (
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {bride.photoUrl && <img src={bride.photoUrl} alt="Bride" className="w-48 h-48 rounded-full mx-auto object-cover mb-6 shadow-lg border-4 border-background" />}
            <h3 className="text-3xl font-heading text-primary mb-2">{bride.fullName}</h3>
            <p className="text-textSecondary mb-4">{bride.parents}</p>
            {bride.instagram && <p className="text-textMuted text-sm">@{bride.instagram}</p>}
          </motion.div>
        )}
      </div>
    </section>
  );
}