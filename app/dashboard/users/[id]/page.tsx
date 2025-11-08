"use client";
import { API_URL } from "@/constants";
import { useState, useEffect } from "react";

type profileUser = {
  userId: string
  username: string
  userEmail: string
  userFullName: string
}

export default async function UserPage({ params }: { params: { userId: string } }) {
  const [user, setUser] = useState<profileUser>();
  const res = await fetch(`${API_URL}/users/${params.userId}`, {
    credentials: "include",  
    cache: "no-store",       
  });

  if (!res.ok) {
    console.error("Error al obtener usuario:", res.status);
    return <p>No autorizado o usuario no encontrado.</p>;
  }

  useEffect(() => {
    if(!params.userId) return;

    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/${params.userId}`, {
        credentials: "include",  
        cache: "no-store",       
      });

      if (!res.ok) {
        console.error("Error al obtener usuario:", res.status);
        return;
      }

      const user = await res.json();
      setUser(user);
    }

    fetchUser();
  }, [params.userId]);

  if(!user){
    return <p>No autorizado o usuario no encontrado.</p>;
  }else{
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">Perfil de {user.userFullName}</h1>
        <p>Email: {user.userEmail}</p>
      </div>
    );
  }
}
