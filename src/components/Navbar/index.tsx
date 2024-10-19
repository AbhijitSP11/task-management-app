import React from 'react'
import { Bell, Menu } from "lucide-react"
import Image from 'next/image';
import Search from '../Search';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsSidebarCollapsed } from '@/redux/slices/globalSlice';
import { Task } from '@/schema/types';
import { setFilteredTasks } from '@/redux/slices/taskSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const allTasks = useAppSelector((state) => state.task.allTasks);

  const handleTaskSelect = (searchTerm: string) => {
    const filteredTasks = allTasks.filter((task: Task) => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    );
    dispatch(setFilteredTasks(filteredTasks));
  };

  const handleCloseSearch = () => {
    dispatch(setFilteredTasks([]));
  };

  return (
    <div className="w-full bg-white dark:bg-dark-bg px-4 py-3 flex flex-col md:flex-row items-center justify-between shadow-md gap-4">
      <div className="flex items-center w-full md:w-auto">
        <button 
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className='w-full md:w-96 lg:w-[32rem]'>
          <Search onClose={handleCloseSearch} />
        </div>
      </div>
      <div className='flex gap-8 items-center'>
        <span className='flex p-2 items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'>
          <Bell className='size-5' />
        </span>
        <div className='flex items-center gap-2'>
          <Image className='rounded-full border border-gray-300' src={"/images/avatar1.png"} alt="avatar" width={32} height={32} />
          <span className='text-sm font-bold dark:text-gray-200'>Abhijit Panchal</span>
        </div>
      </div>
    </div>
  )
};
export default Navbar;
