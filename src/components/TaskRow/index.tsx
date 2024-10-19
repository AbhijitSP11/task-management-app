import React from 'react';
import { Task } from '@/schema/types';
import { Edit, Trash2, CheckCircle, Clock, AlertCircle, ArrowUpCircle } from 'lucide-react';
import { priorityOptions } from '@/constants/constants';

interface TaskRowProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onEditTask, onDeleteTask }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <ArrowUpCircle className="w-5 h-5 text-yellow-500" />;
      case 'Blocked':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    const priorityOption = priorityOptions.find(option => option.value === priority);
    return priorityOption ? priorityOption.icon : null;
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <tr className='border-t border-gray-200 hover:bg-gray-50'>
      <td className='px-6 py-4'>{getStatusIcon(task.status || '')}</td>
      <td className='px-6 py-4'>{task.title}</td>
      <td className='px-6 py-4'>{task.description}</td>
      <td className='px-6 py-4'>{task.assignedUserId}</td>
      <td className='px-6 py-4'>{formatDate(task.dueDate)}</td>
      <td className='px-6 py-4'>{formatDate(task.startDate)}</td>
      <td className='px-6 py-4'>
        <div className="flex items-center">
          {getPriorityIcon(task.priority || '')}
          <span className="ml-2">{task.priority}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <button
          onClick={() => onEditTask(task)}
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
