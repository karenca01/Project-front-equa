import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equa",
  description: "Sitema de gestión de gastos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
