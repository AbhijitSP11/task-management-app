import React from 'react';
import { ArrowUpDown, List, Calendar, User, Flag, LucideTarget } from 'lucide-react';
import { Task } from '@/schema/types';
import TaskRow from '../TaskRow';

interface TaskTableProps {
  tasks: Task[];
  onSort: (column: keyof Task) => void;
  sortColumn: keyof Task | null;
  sortDirection: 'asc' | 'desc';
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onSort, sortColumn, sortDirection, onEditTask, onDeleteTask }) => {
  const renderSortIcon = (column: keyof Task) => {
    if (sortColumn === column) {
      return (
        <ArrowUpDown
          className={`w-4 h-4 ml-1 inline-block transition-transform duration-200 ${
            sortDirection === 'asc' ? 'transform rotate-180' : ''
          }`}
        />
      );
    }
    return <ArrowUpDown className="w-4 h-4 ml-1 inline-block text-gray-300" />;
  };

  const columns = [
    { key: 'title', icon: <LucideTarget className="w-4 h-4 inline mr-2" />, label: 'Task Name' },
    { key: 'description', icon: <List className="w-4 h-4 inline mr-2" />, label: 'Description' },
    { key: 'assignedUserId', icon: <User className="w-4 h-4 inline mr-2" />, label: 'Assignee' },
    { key: 'dueDate', icon: <Calendar className="w-4 h-4 inline mr-2" />, label: 'Due Date' },
    { key: 'startDate', icon: <Calendar className="w-4 h-4 inline mr-2" />, label: 'Start Date' },
    { key: 'priority', icon: <Flag className="w-4 h-4 inline mr-2" />, label: 'Priority' },
  ];

  return (
    <div className='overflow-x-auto border border-gray-300 rounded-lg'>
      <table className='min-w-full bg-white shadow-md'>
        <thead className='bg-gray-100 text-gray-500 font-semibold'>
          <tr>
            <th className='px-6 py-4 text-left'>Status</th>
            {columns.map(({ key, icon, label }) => (
              <th
                key={key}
                className='px-6 py-4 text-left cursor-pointer hover:bg-gray-200 transition-colors duration-200'
                onClick={() => onSort(key as keyof Task)}
              >
                <div className="flex items-center">
                  {icon}
                  <span>{label}</span>
                  {renderSortIcon(key as keyof Task)}
                </div>
              </th>
            ))}
            <th className='px-6 py-4 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;