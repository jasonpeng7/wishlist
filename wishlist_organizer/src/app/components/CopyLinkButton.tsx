'use client'

import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const CopyLinkButton = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link click when copying
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-bone hover:underline truncate max-w-[200px]"
      >
        <ExternalLink size={14} />
        <span className="truncate">{link}</span>
      </a>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-1 text-sm bg-bone text-dark_gray px-2 py-1 rounded-md ml-2"
      >
        {copied ? (
          <>
            <Check size={14} />
            <span className="text-xs">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span className="text-xs">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CopyLinkButton;