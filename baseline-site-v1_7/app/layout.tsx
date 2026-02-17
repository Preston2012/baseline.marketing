import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/config/site";
import Nav from "@/components/Nav";
import { DisclaimerBar } from "@/components/DisclaimerBar";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScifEntry } from "@/components/ScifEntry";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    url: `${site.url}/`,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/og.png"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.contact.support,
    logo: `${site.url}/brand/ba_mark.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: site.contact.support,
      contactType: "customer support"
    },
    sameAs: []
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    description: "Observational speech measurement using independent AI systems",
    url: site.url,
    applicationCategory: "NewsApplication",
    operatingSystem: "iOS, Android",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Core: Free" },
      { "@type": "Offer", price: "7.99", priceCurrency: "USD", description: "Pro: Monthly" },
      { "@type": "Offer", price: "24.99", priceCurrency: "USD", description: "Pro+: Monthly" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrains.variable}`}>
      <body>
        <div style={{ overflow: 'hidden', maxWidth: '100vw', width: '100%' }}>
        <ScifEntry>
          <a className="skip_link" href="#main">
            Skip to content
          </a>

          <JsonLd />

          <ScrollProgress />
          <Nav />
          <DisclaimerBar />

          <main id="main" className="container" data-classification="UNCLASSIFIED" data-grid="0x2DD4BF" data-sys="BASELINE-SIGINT-v3.0">
            {children}
          </main>

          <SiteFooter />
        </ScifEntry>
        </div>
      </body>
    </html>
  );
}
