import { Grid3x3, Grid3X3, List } from 'lucide-react';
import React from 'react'

type Props = {
    id: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const ProjectHeader = ({activeTab, setActiveTab, id}: Props) => {
  return (
    <div className='w-full flex items-center gap-4 border-y border-neutral-200 px-4 py-2'>
     <TabButton 
        name='Board' 
        icon={<Grid3x3 className='h-5 w-5'/>}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        />
      <TabButton 
      name='List' 
      icon={<List className='h-5 w-5'/>}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      />
    </div>
  )
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 
        after:absolute after:-bottom-[9px] after:left-0 after:h-[2px] after:w-full 
        hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;