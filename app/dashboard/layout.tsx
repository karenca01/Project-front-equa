'use client'

import Sidebar from "./_components/Sidebar";
import { usePathname } from "next/navigation";

export default function LayoutDashboard({
    children,
    locations
}: Readonly<{
    children: React.ReactNode,
    locations: React.ReactNode
}>) {
    const path = usePathname()
    return(
        <div className="bg-gray-50">
            <div className="flex flex-row items-center">
                <Sidebar/>
                {children}
                {path === "/dashboard" ? locations: null}
            </div>
        </div>
    )
}