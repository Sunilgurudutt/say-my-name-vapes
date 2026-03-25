"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "smn_age_verified";

export default function AgeGate({ logoUrl }: { logoUrl: string }) {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    try {
      const verified = localStorage.getItem(STORAGE_KEY);
      if (!verified) setVisible(true);
    } catch {
      // localStorage blocked (private mode, etc.) — skip gate
    }
  }, []);

  function handleConfirm() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch { /* ok */ }
    setVisible(false);
  }

  function handleDeny() {
    setDenied(true);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(5, 5, 15, 0.92)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
      >
        {/* Logo */}
        <div className="w-20 h-20 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Say My Name Vapes" className="w-full h-full object-contain" />
        </div>

        {!denied ? (
          <>
            <h2 className="font-display text-[#1c1c1e] text-2xl font-bold mb-2">Age Verification</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              You must be <strong>18 years or older</strong> to enter this site.<br />
              Vaping products are for adults only.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleConfirm}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-200 text-sm hover:shadow-lg hover:shadow-violet-200"
              >
                I am 18 or over — Enter
              </button>
              <button
                onClick={handleDeny}
                className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-200 text-sm"
              >
                I am under 18
              </button>
            </div>
            <p className="text-gray-400 text-[11px] mt-5">
              By entering, you confirm you are of legal age to purchase tobacco/nicotine products in your jurisdiction.
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl">
              🔞
            </div>
            <h2 className="font-display text-[#1c1c1e] text-xl font-bold mb-2">Access Restricted</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sorry, you must be 18 or older to visit this site. This website is intended for adults only.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
