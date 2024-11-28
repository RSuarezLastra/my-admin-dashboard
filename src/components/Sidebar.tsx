import Image from 'next/image';
import Link from 'next/link';
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s" width={100} height={50} alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" width={100} height={50} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          <li>
            <a href="#" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
              <CiBookmarkCheck size={30} />
              <span className="-mr-1 font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
              <CiBookmarkCheck size={30} />
              <span className="group-hover:text-gray-700">Categories</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  )
}