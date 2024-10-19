"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Settings, Users, AlertCircle, ShieldAlert, AlertTriangle, AlertOctagon, Layers3, ChevronDown, ChevronRight, LogOut } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'

const SIDEBAR_LINKS = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/tasks", icon: Layers3, label: "Tasks" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/teams", icon: Users, label: "Teams" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

const PRIORITY_LINKS = [
  { href: "/priority/urgent", icon: AlertCircle, label: "Urgent" },
  { href: "/priority/high", icon: ShieldAlert, label: "High" },
  { href: "/priority/medium", icon: AlertTriangle, label: "Medium" },
  { href: "/priority/low", icon: AlertOctagon, label: "Low" },
]

const PROJECTS = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile App" },
  { id: 3, name: "Marketing Campaign" },
]

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className="w-full">
      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive ? "bg-indigo-100 text-indigo-800" : "text-gray-700 hover:bg-gray-100"
      }`}>
        <Icon className={`h-5 w-5 ${isActive ? "text-indigo-800" : "text-gray-500"}`} />
        <span className={`text-sm font-medium ${isActive ? "text-indigo-800" : "text-gray-700"}`}>
          {label}
        </span>
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [showPriority, setShowPriority] = useState<boolean>(true);

  const isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed);

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-800 dark:text-indigo-400">Twello</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.href} {...link} />
          ))}
        </div>
        <div className="mt-6 px-4">
          <button 
            className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-800 dark:hover:text-indigo-400"
            onClick={() => setShowProjects(!showProjects)}
          >
            <span>Projects</span>
            {showProjects ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {showProjects && (
            <div className="mt-2 space-y-1">
              {PROJECTS.map((project) => (
                <SidebarLink key={project.id} href={`/projects/${project.id}`} icon={Briefcase} label={project.name} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 px-4">
          <button 
            className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-800 dark:hover:text-indigo-400"
            onClick={() => setShowPriority(!showPriority)}
          >
            <span>Priority</span>
            {showPriority ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {showPriority && (
            <div className="mt-2 space-y-1">
              {PRIORITY_LINKS.map((link) => (
                <SidebarLink key={link.href} {...link} />
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
            AP
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Abhijit Panchal</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">abhijtpanchal.dev@gmail.com</p>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar