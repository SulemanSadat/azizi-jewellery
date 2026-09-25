import { AuthProvider } from "@/components/auth/AuthProvider";
import BrandIntro from "@/components/BrandIntro";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div id="top" className="flex min-h-full flex-1 flex-col bg-ivory">
        <BrandIntro />
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </div>
    </AuthProvider>
  );
}
