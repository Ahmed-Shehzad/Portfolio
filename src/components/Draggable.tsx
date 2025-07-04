"use-client";

import { motion } from "motion/react";

import { ReactNode } from "react";

export const Draggable = ({ children }: { children: ReactNode }) => {
  return <motion.div drag>{children}</motion.div>;
};
