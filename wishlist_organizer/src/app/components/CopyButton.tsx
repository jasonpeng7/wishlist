"use client";

import { useEffect, useState } from "react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setCopied(false); setError(""); }, [value]);

  const copy = async () => {
    setError("");
    try { await navigator.clipboard.writeText(value); setCopied(true); }
    catch { setCopied(false); setError("Unable to copy. Select the text and copy it manually."); }
  };

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={copy} aria-label={label} className="min-h-11 px-3 py-2 rounded-lg border border-slate-500 bg-white text-slate_gray text-sm">{copied ? "Copied!" : label}</button>
      <span role="status" className="sr-only">{copied ? "Copied to clipboard." : ""}</span>
      {error && <span role="alert" className="text-sm text-red-800">{error}</span>}
    </span>
  );
}
