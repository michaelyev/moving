import type { Metadata } from "next";
import Script from "next/script"; // Import Next.js Script component
import "./globals.css";
import Footer from "@/_components/Footer/Footer";
import Navbar from "@/_components/Navbar/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Scripts */}
        {/*  <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16739692694"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16739692694', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
