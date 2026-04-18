import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lance Geeffrey De Castro — Web Developer",
  description:
    "Interactive AI portfolio of Lance Geeffrey S. De Castro — Web Developer, CS Student, and builder based in Los Baños, Laguna, Philippines.",
  keywords: ["Lance De Castro", "web developer", "Philippines", "React", "portfolio", "AI portfolio"],
  openGraph: {
    title: "Lance Geeffrey — Web Developer",
    description: "AI-powered interactive portfolio. Ask me anything.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* defaultTheme="light" — matches toukoum.fr white default */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
