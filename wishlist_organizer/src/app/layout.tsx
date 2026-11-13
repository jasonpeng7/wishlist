import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Raleway } from "next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Wishlist Organizer",
  description: "Wishlist Organizer by Jason Peng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className={`${raleway.className} ${raleway.variable} font-sans bg-[#090a0f]`}>
        <Providers>
          <main>
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
