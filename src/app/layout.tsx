import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "full-stack developer",
    "web developer Philippines",
    "WordPress developer",
    "Shopify developer",
    "Webflow developer",
    "Next.js developer",
    "remote web developer",
    "Bacolod City",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  ...(site.googleVerification && { verification: { google: site.googleVerification } }),
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#efeee9" },
  ],
  colorScheme: "dark light",
};

/** Structured data so search engines understand who the site is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Senior Full-Stack Web Developer",
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressCountry: site.country },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["WordPress", "Shopify", "Webflow", "Next.js", "PHP", "JavaScript", "TypeScript", "Web performance", "Technical SEO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ThemeProvider>
        {site.cfAnalyticsToken && (
          <script
            type="module"
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: site.cfAnalyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
