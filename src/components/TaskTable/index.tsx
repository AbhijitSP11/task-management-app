import React from 'react';
import { ChevronDown, ChevronUp, List, Calendar, User, Flag, TargetIcon, LucideTarget } from 'lucide-react';
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
  return (
    <div className='overflow-x-auto border border-gray-300 rounded-lg'>
      <table className='min-w-full bg-white shadow-md'>
        <thead className='bg-gray-100 text-gray-500 font-semibold'>
          <tr>
            <th className='px-6 py-4 text-left'>Status</th>
            {[
              { key: 'title', icon: <LucideTarget className="w-4 h-4 inline mr-2" />, label: 'Task Name' },
              { key: 'description', icon: <List className="w-4 h-4 inline mr-2" />, label: 'Description' },
              { key: 'assignedUserId', icon: <User className="w-4 h-4 inline mr-2" />, label: 'Assignee' },
              { key: 'dueDate', icon: <Calendar className="w-4 h-4 inline mr-2" />, label: 'Due Date' },
              { key: 'startDate', icon: <Calendar className="w-4 h-4 inline mr-2" />, label: 'Start Date' },
              { key: 'priority', icon: <Flag className="w-4 h-4 inline mr-2" />, label: 'Priority' },
            ].map(({ key, icon, label }) => (
              <th
                key={key}
                className='px-6 py-4 text-left cursor-pointer hover:text-blue-500'
                onClick={() => onSort(key as keyof Task)}
              >
                {icon}
                {label}
                <span className='ml-2 inline-flex'>
                  <ChevronUp
                    className={`w-4 h-4 ${sortColumn === key && sortDirection === 'asc'
                      ? 'text-blue-500'
                      : 'text-gray-400'}`}
                  />
                  <ChevronDown
                    className={`w-4 h-4 ${sortColumn === key && sortDirection === 'desc'
                      ? 'text-blue-500'
                      : 'text-gray-400'}`}
                  />
                </span>
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
