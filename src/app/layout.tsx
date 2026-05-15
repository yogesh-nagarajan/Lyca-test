import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>

        <Script id="adobe-prehide" strategy="beforeInteractive">
        {`
        (function(d){
          var style = d.createElement('style');
          style.id = 'at-body-style';
          style.innerHTML = 'body{opacity:0!important}';
          d.head.appendChild(style);

          window.removeATStyle = function() {
            var el = d.getElementById('at-body-style');
            if(el) el.remove();
          };

          setTimeout(window.removeATStyle, 3000);
        })(document);
        `}
        </Script>

        <Script
          src="https://assets.adobedtm.com/4fa03d1212c6/aff5f8797720/launch-068785ad451b-development.min.js"
          strategy="beforeInteractive"
        />

      </head>

      <body>{children}</body>
    </html>
  );
}