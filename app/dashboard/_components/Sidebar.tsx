import { LuBuilding, LuCalendar, LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar(){
    return(
        <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center py-20 justify-center gap-10">
            <NavItem icon={<LuBuilding className="text-4xl"/>} path="/dashboard"/>
            <NavItem icon={<LuCalendar className="text-4xl"/>} path="/dashboard/users/"/>
            //hacer modal para crear evento
        </nav>
    )
}