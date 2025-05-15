import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Zain Payment",
  description: "Zain Payment Portal",
  // Add robots meta tag to prevent indexing
  robots: "noindex, nofollow",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Add robots meta tag to prevent indexing */}
        <meta name="robots" content="noindex, nofollow" />

        {/* Add browser fingerprinting script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple browser fingerprinting
              (function() {
                try {
                  const fingerprint = {
                    screenSize: window.screen.width + 'x' + window.screen.height,
                    colorDepth: window.screen.colorDepth,
                    timezone: new Date().getTimezoneOffset(),
                    language: navigator.language,
                    platform: navigator.platform,
                    cookiesEnabled: navigator.cookieEnabled,
                    canvas: !!window.HTMLCanvasElement,
                    webgl: !!window.WebGLRenderingContext,
                    plugins: Array.from(navigator.plugins || []).length
                  };
                  
                  // Create a simple hash of the fingerprint
                  const fingerprintStr = JSON.stringify(fingerprint);
                  let hash = 0;
                  for (let i = 0; i < fingerprintStr.length; i++) {
                    hash = ((hash << 5) - hash) + fingerprintStr.charCodeAt(i);
                    hash |= 0; // Convert to 32bit integer
                  }
                  
                  // Set as cookie
                  document.cookie = 'browser_fingerprint=' + hash + '; path=/; max-age=86400';
                } catch (e) {
                  // Silently fail if fingerprinting fails
                  console.error('Fingerprinting failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
          {children}
      </body>
    </html>
  )
}
