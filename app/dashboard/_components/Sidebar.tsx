"use client";

import { LuBuilding, LuCalendar, LuChartLine, LuUserRound } from "react-icons/lu";
import NavItem from "./NavItem";
import EventSearchBar from "./EventSearchBar";
import { useRouter } from "next/navigation";
import CreateEvent from "./CreateEvent";
import FormCreateNewEvent from "./FormCreateNewEvent";
import { useState, useEffect } from "react";
import ListOfEvents from "./ListOfEvents";

export default function Sidebar() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleEventSearch = (id: string) => {
    if (!id.trim()) return;
    router.push(`/dashboard/events/${id}`);
  };

  return (
    <nav className="w-3/12 h-[100vh] bg-gris-claro flex flex-col items-center py-5 justify-center gap-10">
      <div className="w-3/4 h-1/8">
        <EventSearchBar onSearch={handleEventSearch} />
      </div>

      <div className="flex flex-row justify-center items-center gap-4 h-1/8">
        <NavItem
          icon={<LuBuilding className="text-4xl w-30" />}
          path="/dashboard"
        />
        <NavItem
          icon={<LuUserRound className="text-4xl w-30" />}
          path="/dashboard/users"
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-4 h-1/8">
        <NavItem
          icon={<LuCalendar className="text-4xl w-30" />}
          path="/dashboard/events"
        />
        <NavItem
          icon={<LuChartLine className="text-4xl w-30" />}
          path="/dashboard/statistics"
        />
      </div>

      <div className="flex flex-col gap-5 h-5/8">
        <div className="flex flex-row gap-15">
          <p>Nuevo evento</p>
          <CreateEvent>
            <FormCreateNewEvent/>
          </CreateEvent>
        </div>
        <ListOfEvents/>
      </div>
    </nav>
  );
}
