import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppSessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valence - Green Hydrogen Intelligence",
  description: "Mapping and optimizing the future of green hydrogen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // --- THIS IS THE FIX ---
    // The `suppressHydrationWarning` prop tells React to ignore
    // minor differences in attributes, like styles injected by extensions.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppSessionProvider>
          {children}
        </AppSessionProvider>
      </body>
    </html>
  );
}