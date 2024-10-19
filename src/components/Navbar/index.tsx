import React, { useState } from 'react'
import { Bell, Menu, MoreVertical } from "lucide-react"
import Image from 'next/image';
import Search from '../Search';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsSidebarCollapsed } from '@/redux/slices/globalSlice';
import { setFilteredTasks } from '@/redux/slices/taskSlice';

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const handleCloseSearch = () => {
    dispatch(setFilteredTasks([]));
  };

  return (
    <div className="w-full bg-white dark:bg-dark-bg px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center flex-1">
        <button 
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className='w-full max-w-[32rem]'>
          <Search onClose={handleCloseSearch} />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='hidden sm:flex gap-4 items-center'>
          <span className='flex p-2 items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'>
            <Bell className='size-5' />
          </span>
          <div className='flex items-center gap-2'>
            <Image className='rounded-full border border-gray-300' src={"/images/avatar1.png"} alt="avatar" width={32} height={32} />
            <span className='text-sm font-bold dark:text-gray-200'>Abhijit Panchal</span>
          </div>
        </div>
        <div className='sm:hidden relative'>
          <button onClick={() => setShowOptions(!showOptions)} className='p-2'>
            <MoreVertical className='size-5' />
          </button>
          {showOptions && (
            <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-dark-bg shadow-lg rounded-md py-1'>
              <div className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2'>
                <Bell className='size-5' />
                <span>Notifications</span>
              </div>
              <div className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2'>
                <Image className='rounded-full border border-gray-300' src={"/images/avatar1.png"} alt="avatar" width={24} height={24} />
                <span className='text-sm'>Abhijit Panchal</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};
export default Navbar;
