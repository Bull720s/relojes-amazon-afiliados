"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ZoomImage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
