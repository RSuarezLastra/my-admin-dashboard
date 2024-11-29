import Link from "next/link";
import { CiBookmarkCheck } from 'react-icons/ci';

interface Props {
  title: string;
  path: string;
}

export const SidebarItem = ({ title, path }: Props) => {
  return (
    <li>
      <Link href={path} className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600">
        <CiBookmarkCheck size={30} />
        <span className="group-hover:text-gray-700">{title}</span>
      </Link>
    </li>
  )
}
