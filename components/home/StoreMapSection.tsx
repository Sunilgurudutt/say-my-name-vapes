"use client";
import { motion } from "framer-motion";
import type { StoreInfo } from "@/types";
import { DAYS_OF_WEEK } from "@/types";

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function StoreMapSection({ store }: { store: StoreInfo }) {
  const today = new Date().toLocaleDateString("en-AU", { weekday: "long" }).toLowerCase();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="text-violet-500 tracking-[0.25em] uppercase text-xs font-semibold mb-3">
            Visit Us
          </p>
          <h2 className="font-display text-[#1c1c1e] text-4xl sm:text-5xl mb-2">
            Find Our Store
          </h2>
          <p className="text-gray-500 text-sm">
            Come visit us in-store — we&apos;d love to help you find the right product.
          </p>
          <div className="brand-rule mt-6 max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >

          {/* Map embed */}
          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto border border-[#e5e4e2] shadow-sm min-h-[320px]">
            {store.mapEmbedUrl ? (
              <iframe
                src={store.mapEmbedUrl}
                width="100%"
                height="100%"
                className="min-h-[320px] w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Say My Name Vapes store location"
              />
            ) : (
              <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center gap-4 bg-[#f8f7f5]">
                <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Map coming soon</p>
              </div>
            )}
          </div>

          {/* Store info panel */}
          <div className="rounded-2xl border border-[#e5e4e2] bg-white p-7 sm:p-9 flex flex-col gap-7 shadow-sm">

            {/* Address */}
            <div>
              <h3 className="text-violet-500 text-[9px] tracking-[0.4em] uppercase font-bold mb-3 flex items-center gap-2">
                <span className="w-4 h-px inline-block bg-violet-400" />
                Address
              </h3>
              <p className="text-[#1c1c1e] font-semibold text-base">
                {store.address}
              </p>
              <p className="text-gray-500 mt-0.5">
                {store.suburb}, {store.state} {store.postcode}
              </p>
              <div className="mt-3 space-y-1.5">
                {store.phone && (
                  <a
                    href={`tel:${store.phone}`}
                    className="flex items-center gap-2 text-gray-600 text-sm hover:text-violet-600 transition-colors group"
                  >
                    <span className="text-violet-400 group-hover:text-violet-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    {store.phone}
                  </a>
                )}
                {store.email && (
                  <a
                    href={`mailto:${store.email}`}
                    className="flex items-center gap-2 text-gray-600 text-sm hover:text-violet-600 transition-colors group"
                  >
                    <span className="text-violet-400 group-hover:text-violet-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    {store.email}
                  </a>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="brand-rule opacity-40" />

            {/* Hours */}
            <div>
              <h3 className="text-violet-500 text-[9px] tracking-[0.4em] uppercase font-bold mb-4 flex items-center gap-2">
                <span className="w-4 h-px inline-block bg-violet-400" />
                Trading Hours
              </h3>
              <div className="space-y-2">
                {DAYS_OF_WEEK.map((day) => {
                  const h = store.hours[day];
                  if (!h) return null;
                  const isToday = today === day;
                  return (
                    <div
                      key={day}
                      className="flex justify-between items-center text-sm py-0.5"
                      style={isToday ? { borderLeft: "2px solid #8b5cf6", paddingLeft: "8px", marginLeft: "-10px" } : {}}
                    >
                      <span className={isToday ? "text-violet-600 font-semibold" : "text-gray-500"}>
                        {capitalise(day)}
                        {isToday && (
                          <span className="ml-2 text-[9px] tracking-widest uppercase text-violet-400">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={h.closed ? "text-gray-300" : isToday ? "text-violet-600 font-semibold" : "text-[#1c1c1e]"}>
                        {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
