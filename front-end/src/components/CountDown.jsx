import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveSale } from "../api/admin";
import { gsap } from "gsap";

const CountDown = () => {
  const { data: sale, isLoading } = useQuery({
    queryKey: ["active-sale"],
    queryFn: fetchActiveSale,
    staleTime: Infinity,
  });

  const [timeLeft, setTimeLeft] = useState(null);

  const refs = useRef({});
  const prev = useRef({});

  // ================= TIMER =================
  useEffect(() => {
    if (!sale?.endsAt) return;

    const end = new Date(sale.endsAt);

    const interval = setInterval(() => {
      const diff = end.getTime() - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sale?.endsAt]);

  // ================= SMOOTH DIGIT CHANGE =================
  useEffect(() => {
    if (!timeLeft) return;

    if (!prev.current) {
      prev.current = timeLeft;
      return;
    }

    Object.keys(timeLeft).forEach((key) => {
      const el = refs.current[key];
      if (!el) return;

      const oldVal = prev.current[key];
      const newVal = timeLeft[key];

      if (oldVal === newVal) return;

      // clean "ticker style" animation
      gsap.fromTo(
        el,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }
      );

      // subtle urgency ONLY for seconds
      if (key === "secs") {
        gsap.fromTo(
          el,
          { opacity: 0.7 },
          {
            opacity: 1,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
          }
        );
      }
    });

    prev.current = timeLeft;
  }, [timeLeft]);

  if (isLoading || !timeLeft) return null;

  return (
    <div className="my-20">
      {/* HEADER */}
      <h1 className="text-center text-3xl font-semibold text-slate-700 dark:text-white/60 mb-8">
        {sale.discountPercent}% OFF ENDS SOON
      </h1>

      {/* TIMER */}
      <div className="flex justify-center sm:gap-8 gap-4">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="text-center">
            
            {/* NUMBER */}
            <div className="bg-white dark:bg-slate-800 px-3 sm:px-6 py-4 rounded-xl shadow-md ">
              <span
                ref={(el) => (refs.current[key] = el)}
                className="text-4xl font-bold font-mono text-slate-800 dark:text-white tabular-nums"
              >
                {value < 10 ? `0${value}` : value}
              </span>
            </div>

            {/* LABEL */}
            <p className="text-xs uppercase tracking-widest text-slate-500 mt-2">
              {key}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDown;