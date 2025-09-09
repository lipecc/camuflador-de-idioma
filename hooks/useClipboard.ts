
import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (!text || isCopied) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  }, [isCopied, timeout]);

  return { isCopied, copy };
};
