"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById("global-modal");
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
