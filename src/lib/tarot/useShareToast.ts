"use client";

import { useState, useEffect, useCallback } from "react";

export function useShareToast() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timeout = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(timeout);
  }, [toastVisible]);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/tarot`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("링크가 복사되었습니다");
    } catch {
      showToast("링크 복사에 실패했습니다");
    }
  }, [showToast]);

  return { toastMessage, toastVisible, handleShare };
}
