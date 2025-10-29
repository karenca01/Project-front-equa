"use client";

import { Button } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();
  const pathname = usePathname();


  const isLogin = pathname === "/login";

  
  const targetPath = isLogin ? "/signup" : "/login";
  const buttonText = isLogin ? "Signup" : "Login";

  return (
    <Button
      className="bg-gris-claro hover:bg-gray-200 rounded-md"
      onPress={() => router.push(targetPath)}
    >
      {buttonText}
    </Button>
  );
}
