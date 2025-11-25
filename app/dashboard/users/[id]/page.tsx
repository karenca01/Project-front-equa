"use client";
import { useUser } from "@/context/UserContext";
import UpdateUser from "./_components/UpdateUser";
import FormUpdateUser from "./_components/FormUpdateUser";
import ListOfMyEvents from "./_components/ListOfMyEvents";
import ListOfEvents from "./_components/ListOfEvents";

export default function UserPage() {
  const { user } = useUser();

  if (!user) return <p>Cargando usuario...</p>;

  // return (
  //   <div className="flex flex-col justify-center w-9/12 h-[100vh] p-5">
  //     <div className="flex flex-row h-3/12">
  //       <div className="flex flex-col justify-center w-9/12 h-full">
  //         <h1 className="text-5xl font-bold py-4">
  //           {user.userFullName}
  //         </h1>
  //         <p className="text-xl"><b>Username: </b>{user.username}</p>
  //       </div>
  //       <div className="flex flex-col justify-center items-center w-3/12 pt-4 h-full">
  //         <UpdateUser>
  //           <FormUpdateUser user={user}/>
  //         </UpdateUser>
  //       </div>
  //     </div>

  //     <div className="w-full bg-gris-fuerte h-1"/>

  //     <div className="w-full h-9/12 p-5">
  //       <p><b>Email: </b>{user.userEmail}</p>
  //       <div className="w-full h-fit">
  //         <p><b>Eventos creados: </b>{user.eventsCreated}</p>
  //         <ListOfMyEvents/>
  //       </div>
  //       <div className="w-full h-fit">
  //         <p><b>Eventos participados: </b>{user.eventsParticipated}</p>
  //         <ListOfEvents/>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col w-10/12 min-h-screen p-6 space-y-6">
      {/* Header: nombre y actualización */}
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

      {/* Separador */}
      <div className="w-full border-t border-gris-muy-fuerte" />

      {/* Información de contacto */}
      <div className="flex flex-col gap-4">
        <p className="text-lg">
          <b>Email:</b> {user.userEmail}
        </p>

        {/* Eventos creados */}
        <div className="flex flex-col gap-2">
          <p className="text-lg">
            <b>Eventos creados:</b> {user.eventsCreated}
          </p>
          <div className="overflow-y-auto max-h-64">
            <ListOfMyEvents />
          </div>
        </div>

        {/* Eventos participados */}
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
