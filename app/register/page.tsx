import type { Metadata } from "next";
import AuthGate from "@/components/auth/AuthGate";
import AuthPage from "@/components/auth/AuthPage";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account | AZIZI JEWELLERY",
  description:
    "Create a private AZIZI JEWELLERY client account for appointments and valuations in London.",
};

export default function RegisterPage() {
  return (
    <AuthPage
      kicker="Become a client"
      title="Create an account"
      description="A quiet record of your visits, kept for you alone. You may still book an appointment without an account."
    >
      <AuthGate mode="guest">
        <RegisterForm />
      </AuthGate>
    </AuthPage>
  );
}
