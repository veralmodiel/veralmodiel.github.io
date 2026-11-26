import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Share_Tech_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MouseTracker } from "@/components/mouse-tracker";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ver Almodiel | Senior Full-Stack Developer",
  description: "Senior Full-Stack Web Developer portfolio specializing in modern web ecosystems and AI-assisted delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${shareTechMono.variable}`}>
       <body className="antialiased min-h-screen">
        <div className="fixed inset-0 noise z-50 pointer-events-none" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <MotionConfig reducedMotion="user">
            <MouseTracker />
            <SmoothScroll>{children}</SmoothScroll>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
