import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="flex h-screen w-full bg-slate-200 dark:bg-slate-900 items-center justify-center">
      <h1 className="dark:text-gray-50 text-gray-900 text-3xl font-semibold tracking-widest mx-2">
        Loading
      </h1>
      <motion.div
        animate={{
          scale: [1.2, 0.5, 1.5],
          rotate: [0, 50, 275],
          borderRadius: ["10%", "25%", "50%"],
          transition: {
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.1, 0.5, 1],
            repeat: Infinity,
          },
        }}
        className="w-10 h-10 rounded-full bg-indigo-700"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1.2, 0.5, 1.5],
          rotate: [0, 50, 275],
          borderRadius: ["10%", "25%", "50%"],
          transition: {
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.1, 0.7, 1],
            repeat: Infinity,
          },
        }}
        className="w-10 h-10 rounded-full bg-pink-700 mx-1"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1.2, 0.5, 1.5],
          rotate: [0, 50, 275],
          borderRadius: ["10%", "25%", "50%"],
          transition: {
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
          },
        }}
        className="w-10 h-10 rounded-full bg-orange-700"
      ></motion.div>
    </div>
  );
};
