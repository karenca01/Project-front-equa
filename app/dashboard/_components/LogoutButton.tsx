"use client";

import { Button } from "@heroui/react";
import { logout } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await logout();

      if (res.success) {
        router.push("/login");
      }
    });
  };

  return (
    <Button
      color="danger"
      variant="shadow"
      isLoading={isPending}
      onPress={handleLogout}
    >
      Cerrar sesión
    </Button>
  );
}