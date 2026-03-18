import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CloudQ - AI Cloud Infrastructure Assistant",
  description:
    "AI-powered assistant for cloud infrastructure, DevOps, and software development. Generate IaC, compare costs, scan security, and more across AWS, GCP, and Azure.",
  keywords: [
    "cloud",
    "infrastructure",
    "devops",
    "terraform",
    "aws",
    "gcp",
    "azure",
    "ai assistant",
    "iac",
    "security",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-gray-950 text-gray-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
