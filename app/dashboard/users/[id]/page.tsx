"use client";
import { useUser } from "@/context/UserContext";
import UpdateUser from "./_components/UpdateUser";
import FormUpdateUser from "./_components/FormUpdateUser";
import ListOfMyEvents from "./_components/ListOfMyEvents";
import ListOfEvents from "./_components/ListOfEvents";

export default function UserPage() {
  const { user } = useUser();

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="flex flex-col w-10/12 min-h-screen p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex flex-row items-center gap-5">
            <h1 className="text-4xl md:text-5xl font-bold">{user.userFullName}</h1>
            <UpdateUser>
              <FormUpdateUser user={user} />
            </UpdateUser>
          </div>
          <p className="text-lg md:text-xl mt-1 pt-3">
            <b>Username:</b> {user.username}
          </p>
        </div>
      </div>

      <div className="w-full border-t border-gris-muy-fuerte" />

      <div className="flex flex-col gap-4">
        <p className="text-lg">
          <b>Email:</b> {user.userEmail}
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-lg">
            <b>Eventos creados:</b> {user.eventsCreated}
          </p>
          <div className="overflow-y-auto max-h-64">
            <ListOfMyEvents />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg">
            <b>Eventos participados:</b> {user.eventsParticipated}
          </p>
          <div className="overflow-y-auto max-h-64">
            <ListOfEvents />
          </div>
        </div>
      </div>
    </div>
  );
}
