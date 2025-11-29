import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoltChain - Decentralized Energy Trading",
  description: "Tokenize your wattage. Trade on-chain. Verified by Oracles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
