import Script from 'next/script';

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}
      <Script
          src="https://assets.adobedtm.com/4fa03d1212c6/aff5f8797720/launch-068785ad451b-development.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
