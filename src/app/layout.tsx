import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fortsh - The Fortran Shell",
  description:
    "A modern, POSIX-compliant shell written in Fortran with fish-like features",
  keywords: [
    "fortsh",
    "shell",
    "fortran",
    "posix",
    "terminal",
    "command line",
    "bash alternative",
  ],
  authors: [{ name: "FortranGoingOnForty" }],
  openGraph: {
    title: "fortsh - The Fortran Shell",
    description:
      "A modern, POSIX-compliant shell written in Fortran with fish-like features",
    url: "https://fortsh.musicsian.com",
    siteName: "fortsh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
