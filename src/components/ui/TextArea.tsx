"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-200",
            "placeholder:text-gray-500 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-cloud-500/50 focus:border-cloud-500",
            "font-mono",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
