import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fortsh.musicsian.com"),
  title: {
    default: "fortsh - The Fortran Shell",
    template: "%s | fortsh",
  },
  description:
    "A modern, POSIX-compliant shell written in Fortran 2018 with fish-like autosuggestions, syntax highlighting, and 60+ builtin commands.",
  keywords: [
    "fortsh",
    "shell",
    "fortran",
    "posix",
    "terminal",
    "command line",
    "bash alternative",
    "fish shell",
    "syntax highlighting",
    "autosuggestions",
  ],
  authors: [{ name: "FortranGoingOnForty" }],
  creator: "FortranGoingOnForty",
  publisher: "FortranGoingOnForty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "fortsh - The Fortran Shell",
    description:
      "A modern, POSIX-compliant shell written in Fortran 2018 with fish-like features",
    url: "https://fortsh.musicsian.com",
    siteName: "fortsh",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "fortsh - The Fortran Shell",
    description:
      "A modern, POSIX-compliant shell written in Fortran 2018 with fish-like features",
  },
  alternates: {
    canonical: "https://fortsh.musicsian.com",
  },
  category: "technology",
  verification: {
    google: "iVc7DzHkxK1tBUDKC3wov8IxscFpXPj_Y52C0VWkpug",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "fortsh",
              description:
                "A modern, POSIX-compliant shell written in Fortran 2018 with fish-like autosuggestions, syntax highlighting, and 60+ builtin commands.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Linux, macOS",
              url: "https://fortsh.musicsian.com",
              downloadUrl:
                "https://github.com/FortranGoingOnForty/fortsh/releases",
              softwareVersion: "1.3",
              license: "https://opensource.org/licenses/MIT",
              author: {
                "@type": "Person",
                name: "FortranGoingOnForty",
                url: "https://github.com/FortranGoingOnForty",
              },
              programmingLanguage: "Fortran",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
