import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

export const metadata: Metadata = {
  title: "DNAX.ai Os — Command. Create. Conquer.",
  description:
    "Elite AI-native command center for architectural, interior design, production, and brand-focused MNCs. Fortune-500-grade workspace management.",
  keywords: [
    "project management",
    "architecture",
    "design",
    "AI",
    "enterprise",
    "SaaS",
  ],
  authors: [{ name: "DNAX.ai Os" }],
  openGraph: {
    title: "DNAX.ai Os — Command. Create. Conquer.",
    description: "Elite AI-native command center for design-focused MNCs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="obsidian" className="h-full" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var theme = localStorage.getItem('dnax-os-theme');
              if (theme) {
                document.documentElement.setAttribute('data-theme', theme);
              }
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
