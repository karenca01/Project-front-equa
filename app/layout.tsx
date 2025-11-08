import "../styles/globals.css";
import type { Metadata } from "next";
import { UserProviderWrapper } from "@/context/UserProviderWrapper";

export const metadata: Metadata = {
  title: "Equa",
  description: "Sistema de gestión de gastos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <UserProviderWrapper>{children}</UserProviderWrapper>
      </body>
    </html>
  );
}
