"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export function CountdownSection({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-20 bg-primary text-primaryForeground text-center">
      <h2 className="text-2xl font-bold mb-8">Menuju Hari Bahagia</h2>
      <div className="flex justify-center gap-4 sm:gap-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl font-bold">{value}</span>
            <span className="text-sm uppercase tracking-widest mt-2">{unit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}