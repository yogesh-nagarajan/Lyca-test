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
          src="https://assets.adobedtm.com/4fa03d1212c6/1bcc82a1f2a7/launch-dcd67db7e624-development.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}