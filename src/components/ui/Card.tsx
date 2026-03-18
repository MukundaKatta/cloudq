"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className, hover = false, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm",
        hover && "hover:border-cloud-500/30 hover:bg-gray-800/80 transition-all duration-200 cursor-pointer",
        glow && "shadow-lg shadow-cloud-500/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-4 border-b border-gray-700/50", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-3 border-t border-gray-700/50", className)} {...props}>
      {children}
    </div>
  );
}
