"use client";

import { motion } from "motion/react";
import { DUR, EASE_ENTRY } from "@/features/tarot/lib/motion";

export default function TarotTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.page, ease: EASE_ENTRY }}
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      {children}
    </motion.div>
  );
}
