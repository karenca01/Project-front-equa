"use client";
import { useUser } from "@/context/UserContext";

export default function UserPage() {
  const { user } = useUser();

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="flex flex-col justify-center w-full h-screen p-10">
      <div className="flex flex-col h-1/4 justify-center">
        <h1 className="text-4xl font-bold mb-2">
          {user.userFullName}
        </h1>
        <p className="p-2"><b>Username: </b>{user.username}</p>
      </div>
      <div className="w-full h-1 bg-gris-fuerte"/>
      <div className="flex flex-col h-2/4 pt-5">
        <p><b>Email: </b>{user.userEmail}</p>
        <p><b>Eventos creados: </b>{user.eventsCreated}</p>
        <p><b>Eventos participados: </b>{user.eventsParticipated}</p>
      </div>
    </div>
  );
}
