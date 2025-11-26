//side bar para navegación

"use client";

import { LuBuilding, LuCalendar, LuChartLine, LuUserRound } from "react-icons/lu";
import NavItem from "./NavItem";
import EventSearchBar from "./EventSearchBar";
import { useRouter } from "next/navigation";
import CreateEvent from "./CreateEvent";
import FormCreateNewEvent from "./FormCreateNewEvent";
import ListOfEvents from "./ListOfEvents";
import { useUser } from "@/context/UserContext";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useUser();

  const handleEventSearch = (id: string) => {
    if (!id.trim()) return;
    router.push(`/dashboard/events/${id}`);
  };

  return (
    <nav className="w-2/12 bg-gris-fuerte text-white min-h-screen flex flex-col p-5 justify-start shadow-lg">
    {/* <nav className="w-64 bg-gris-fuerte text-white min-h-screen flex flex-col p-5 justify-start shadow-lg"> */}
      <div className="mb-20">
        <EventSearchBar onSearch={handleEventSearch} />
      </div>

      <div className="flex flex-col gap-4 mb-20">
        <div className="flex justify-center gap-4">
          <NavItem
            icon={<LuBuilding className="text-3xl text-gris-muy-fuerte" />}
            path="/dashboard"
          />
          <NavItem
            icon={<LuUserRound className="text-3xl text-gris-muy-fuerte" />}
            path={`/dashboard/users/${user?.userId}`}
          />
        </div>
        <div className="flex justify-center gap-4">
          <NavItem
            icon={<LuCalendar className="text-3xl text-gris-muy-fuerte" />}
            path="/dashboard/events"
          />
          <NavItem
            icon={<LuChartLine className="text-3xl text-gris-muy-fuerte" />}
            path="/dashboard/statistics"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-medium text-gray-300">Crear nuevo evento</p>
          <CreateEvent>
            <FormCreateNewEvent />
          </CreateEvent>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-300 mb-3">Tus eventos</p>
          <ListOfEvents />
        </div>

        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}