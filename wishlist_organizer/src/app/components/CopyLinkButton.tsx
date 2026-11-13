"use client";

import { ExternalLink } from "lucide-react";
import CopyButton from "./CopyButton";

export default function CopyLinkButton({ link }: { link: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-bone underline break-all">
        <ExternalLink size={14} aria-hidden="true" /><span>{link}</span>
      </a>
      <CopyButton value={link} label="Copy link" />
    </div>
  );
}
