"use client";

import { LuBuilding, LuCalendar } from "react-icons/lu";
import NavItem from "./NavItem";
import EventSearchBar from "./EventSearchBar";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleEventSearch = (id: string) => {
    if (!id.trim()) return;
    router.push(`/dashboard/events/${id}`);
  };

  return (
    <nav className="w-3/12 h-[90vh] bg-gris-claro flex flex-col items-center py-20 justify-center gap-10">
      <div className="w-3/4">
        <EventSearchBar onSearch={handleEventSearch} />
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <NavItem
          icon={<LuBuilding className="text-4xl w-30 border-1" />}
          path="/dashboard"
        />
        <NavItem
          icon={<LuCalendar className="text-4xl w-30 border-1" />}
          path="/dashboard/users/"
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <NavItem
          icon={<LuCalendar className="text-4xl w-30 border-1" />}
          path="/dashboard/users/"
        />
        <NavItem
          icon={<LuBuilding className="text-4xl w-30 border-1" />}
          path="/dashboard"
        />
      </div>
      
      {/* hacer modal para crear evento */}
    </nav>
  );
}
