import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { SidebarItem } from './SidebarItem';
import { IoCalendarOutline, IoCartOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ButtonLogout } from './ButtonLogout';

const navLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoCalendarOutline />
  },
  {
    title: 'Rest Todos',
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline />
  },
  {
    title: 'Server Actions',
    path: '/dashboard/server-actions',
    icon: <IoListOutline />
  },
  {
    title: 'Cookies',
    path: '/dashboard/cookies',
    icon: <IoCodeWorking />
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: <IoCartOutline />
  },
  {
    title: 'Perfil',
    path: '/dashboard/profile',
    icon: <IoPersonOutline />
  },
]

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? 'No name';
  const avatar = (session?.user?.image)
    ? session?.user?.image
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"

  const roles = session?.user?.roles?.join(', ') ?? 'User';

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
              width={100}
              height={50}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatar}
            alt="user image"
            width={100}
            height={50}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">{roles}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            navLinks.map(item => (
              <SidebarItem key={item.title} {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <ButtonLogout />
      </div>
    </aside>
  )
}
