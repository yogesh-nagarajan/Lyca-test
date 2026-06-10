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

        {/* Immediate prehide */}
        <style
          id="at-body-style"
          dangerouslySetInnerHTML={{
            __html: `
              body {
                opacity: 0 !important;
              }
            `,
          }}
        />

        {/* Debug + Prehide Logic */}
        <Script id="adobe-prehide" strategy="beforeInteractive">
          {`
            console.log("[Target] Prehide style added");

            window.removeATStyle = function(source = "unknown") {
              console.log("[Target] Removing prehide from:", source);

              const el = document.getElementById("at-body-style");

              if (el) {
                el.remove();
                console.log("[Target] Prehide removed successfully");
              } else {
                console.log("[Target] Prehide style already removed");
              }
            };

            // Adobe Target lifecycle events
            document.addEventListener("at-library-loaded", function() {
              console.log("[Target] at.js library loaded");
            });

            document.addEventListener("at-request-start", function() {
              console.log("[Target] Request started");
            });

            document.addEventListener("at-request-succeeded", function(event) {
              console.log("[Target] Request succeeded", event.detail);
            });

            document.addEventListener(
              "at-content-rendering-started",
              function() {
                console.log("[Target] Content rendering started");
              }
            );

            document.addEventListener(
              "at-content-rendering-succeeded",
              function() {
                console.log("[Target] Content rendering succeeded");
                window.removeATStyle("Target Success Event");
              }
            );

            document.addEventListener(
              "at-content-rendering-failed",
              function(event) {
                console.log("[Target] Rendering failed", event.detail);
                window.removeATStyle("Rendering Failed");
              }
            );

            // Safety fallback
            setTimeout(function() {
              console.log("[Target] Fallback timeout triggered");
              window.removeATStyle("Timeout Fallback");
            }, 5000);

          `}
        </Script>




        <Script id="digital-data" strategy="beforeInteractive">
        {`
          window.digitalData = {
            page: {
              pageName: "Home Page",
              category: "SIM - Electronics",
              language: "en"
            },

            user: {
              loginStatus: "logged-out",
              customerId: "CUST-1001"
            }
          };
        `}
        </Script>
        <Script id="target-page-params" strategy="beforeInteractive">
        {`
          window.targetPageParams = function() {
            return {
              pageName: document.title,
              siteSection: "Yogesh - products -cdsfd"
            };
          };
        `}
        </Script>


        {/* Adobe Launch */}
        <Script
          src="https://assets.adobedtm.com/4fa03d1212c6/aff5f8797720/launch-068785ad451b-development.min.js"
          strategy="beforeInteractive"
        />

        <Script id="launch-debug" strategy="beforeInteractive">
        {`
          window.addEventListener("load", function () {
            console.log("[Target] Window loaded");

            if (window.adobe) {
              console.log("[Target] Adobe object available");
            }

            if (window.adobe && window.adobe.target) {
              console.log("[Target] at.js loaded successfully");
            } else {
              console.log("[Target] at.js NOT loaded");
            }
          });
        `}
        </Script>

      </head>

      <body>{children}</body>
    </html>
  );
}