'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}


export const SidebarItem = ({ title, path, icon }: Props) => {

  const pathName = usePathname();

  return (
    <li>
      <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:bg-sky-600 hover:text-white text-gray-600 group
        ${path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
        {icon}
        <span className="group-hover:text-white-700">{title}</span>
      </Link>
    </li>
  )
}
