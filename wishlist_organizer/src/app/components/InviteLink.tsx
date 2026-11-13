"use client";

import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";

export default function InviteLink({ inviteId }: { inviteId: string }) {
  const [link, setLink] = useState("");
  useEffect(() => { setLink(new URL(`/join/${encodeURIComponent(inviteId)}`, window.location.origin).href); }, [inviteId]);
  return (
    <div className="min-w-0 max-w-full space-y-3">
      <p className="text-sm text-slate_gray">Share this link to invite someone to your group:</p>
      {link ? <><a href={link} className="block break-all text-[#315b47] underline underline-offset-4">{link}</a><CopyButton value={link} label="Copy invite link" /></> : <p role="status" className="text-sm text-slate_gray">Preparing invite link…</p>}
    </div>
  );
}
