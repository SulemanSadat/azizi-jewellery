import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import SiteShell from "@/components/SiteShell";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AZIZI JEWELLERY | Sell Your Gold With Confidence",
  description:
    "A London house for private gold buying and fine jewellery. Transparent valuations, by appointment.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-ivory font-sans text-charcoal">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(INTRO_STORAGE_KEY)};var home=location.pathname==="/"||location.pathname==="";if(sessionStorage.getItem(k)==="1"){document.documentElement.dataset.intro="done";}else if(home){document.documentElement.classList.add("intro-lock");}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`.brand-intro{display:none!important}html.intro-lock,html.intro-lock body{overflow:visible;height:auto;position:static;touch-action:auto}`}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
