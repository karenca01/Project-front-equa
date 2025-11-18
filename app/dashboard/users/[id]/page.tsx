"use client";
import { useUser } from "@/context/UserContext";

export default function UserPage() {
  const { user } = useUser();

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="flex flex-col justify-center w-9/12 h-[100vh] p-5">
      <div className="flex flex-row h-3/12">
        <div className="flex flex-col justify-center w-9/12 h-full">
          <h1 className="text-5xl font-bold py-4">
            {user.userFullName}
          </h1>
          <p className="text-xl"><b>Username: </b>{user.username}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-3/12 pt-4 h-full">
          <p>MODAL EDITAR</p>
        </div>
      </div>

      <div className="w-full bg-gris-fuerte h-1"/>

      <div className="w-full h-9/12 p-5">
        <p><b>Email: </b>{user.userEmail}</p>
        <p><b>Eventos creados: </b>{user.eventsCreated}</p>
        <p><b>Eventos participados: </b>{user.eventsParticipated}</p>
      </div>
    </div>
  );
}
