"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({ onSend, placeholder = "Ask about cloud infrastructure...", disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-700/50 bg-gray-900/80 p-4">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-200",
              "placeholder:text-gray-500 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-cloud-500/50 focus:border-cloud-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className={cn(
              "absolute right-2 bottom-2 p-2 rounded-lg transition-all",
              value.trim() && !disabled
                ? "bg-cloud-600 text-white hover:bg-cloud-700"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            )}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-gray-600 text-center mt-2">
        Shift+Enter for new line. CloudQ provides AI-generated guidance -- always verify before applying to production.
      </p>
    </div>
  );
}
