"use client";

export default function LoadingDots({ text = "Thinking" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <span className="text-sm">{text}</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-cloud-500 animate-bounce [animation-delay:0ms]" />
        <div className="w-1.5 h-1.5 rounded-full bg-cloud-500 animate-bounce [animation-delay:150ms]" />
        <div className="w-1.5 h-1.5 rounded-full bg-cloud-500 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
