//checa la ruta y la marca
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps{
    icon: ReactNode
    path: string
}

export const NavItem = ({icon, path}: NavItemProps) => {
    const pathName = usePathname();
    return (
        <Link href={path} className="w-full flex justify-center">
            <span className={pathName === path ? "bg-gris-intermedio w-10/12 flex justify-center rounded-md transition-colors py-2" : "w-10/12 py-2  flex justify-center"}>{icon}</span>
        </Link>
    )
}

export default NavItem;