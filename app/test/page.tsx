"use client";
import { useUser } from "@/context/UserContext";

export default function TestUser() {
  const { user } = useUser();

  return (
    <div className="p-4">
      {user ? (
        <>
          <h2>Usuario autenticado ✅</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <p>No hay usuario autenticado</p>
      )}
    </div>
  );
}
