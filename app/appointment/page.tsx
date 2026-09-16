import type { Metadata } from "next";
import Appointment from "@/components/Appointment";

export const metadata: Metadata = {
  title: "Book an Appointment | AZIZI JEWELLERY",
  description:
    "Arrange a private gold buying or jewellery appointment with AZIZI JEWELLERY in London.",
};

export default function AppointmentPage() {
  return <Appointment />;
}
