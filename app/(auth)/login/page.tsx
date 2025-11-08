"use client";
import { API_URL } from "@/constants";
import { Button, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Recolectamos los datos del formulario
    const formData = new FormData(e.currentTarget);
    const authData = {
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    };

    try {
      // 1️⃣ Hacemos login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
        credentials: "include", // IMPORTANTE: para enviar y recibir cookies
      });

      if (response.ok) {
        console.log("✅ Login exitoso, esperando que se guarde la cookie...");
        // Esperamos un poco para asegurar que el navegador haya guardado la cookie
        await new Promise((r) => setTimeout(r, 300));

        // 2️⃣ Obtenemos los datos del usuario autenticado
        const userRes = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (userRes.ok) {
          const user = await userRes.json();
          console.log("👤 Usuario autenticado:", user);
          // 3️⃣ Redirigimos al dashboard
          router.push("/dashboard");
        } else {
          console.warn("⚠️ No se pudo obtener el usuario después del login");
        }
      } else {
        console.error("❌ Credenciales inválidas o error en login");
      }
    } catch (error) {
      console.error("🚨 Error en el proceso de login:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center bg-gris-claro w-[60vh] h-[50vh] px-10 py-2 rounded-md">
      <form onSubmit={handleSubmit}>
        <p className="text-2xl my-4 text-center">
          <b>Iniciar sesión</b>
        </p>

        <div className="flex flex-col gap-2 my-4 items-center">
          <Input label="Email" name="userEmail" type="email" isRequired size="md" />
          <Input label="Contraseña" name="userPassword" type="password" isRequired size="md" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Button
            className="bg-gris-intermedio hover:bg-gris-fuerte text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? <Spinner size="md" /> : "Entrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
