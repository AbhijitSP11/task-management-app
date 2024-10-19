import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, TargetIcon } from 'lucide-react';
import { Task } from '@/schema/types';
import { priorityOptions, statusOptions } from '@/constants/constants';

interface TaskFormProps {
  onAddTask: (task: Partial<Task>) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose }) => {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    status: 'To Do',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { title, description, priority, startDate, dueDate } = newTask;
    setIsFormValid(
      !!title && !!description && !!priority && !!startDate && !!dueDate && startDate <= dueDate
    );
  }, [newTask]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSelectChange = (name: string) => (selectedOption: any) => {
    setNewTask({ ...newTask, [name]: selectedOption.value });
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    if (date) {
      setNewTask({ ...newTask, [name]: formatDate(date) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <div className='flex items-center gap-2 mb-4'>
        <span><TargetIcon className='size-8 text-indigo-500'/></span>
        <h2 className="text-xl font-semibold text-gray-600">Add New Task</h2>
      </div>
      
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-base font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 px-4 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm h-10"
          onChange={handleInputChange}
          placeholder='Enter task title'
          required
        />
      </div>
      
      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-base font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 p-4 block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm h-28"
          onChange={handleInputChange}
          required
          placeholder='Describe the task'
        />
      </div>

      {/* Priority and Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-base font-medium text-gray-700">Priority</label>
          <Select
            options={priorityOptions}
            onChange={handleSelectChange('priority')}
            className="mt-1 h-10 cursor-pointer"
            formatOptionLabel={({ label, icon }) => (
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{label}</span>
              </div>
            )}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-base font-medium text-gray-700">Status</label>
          <Select
            options={statusOptions}
            onChange={handleSelectChange('status')}
            defaultValue={statusOptions[0]}
            className="mt-1 h-10 cursor-pointer"
            formatOptionLabel={({ label, icon }) => (
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{label}</span>
              </div>
            )}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-base font-medium text-gray-700">Start Date</label>
          <div className="mt-1 relative">
            <DatePicker
              selected={newTask.startDate ? new Date(newTask.startDate) : null}
              onChange={handleDateChange('startDate')}
              minDate={new Date()}
              className="w-full cursor-pointer rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 pl-10"
              dateFormat="yyyy-MM-dd"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-base font-medium text-gray-700">Due Date</label>
          <div className="mt-1 relative">
            <DatePicker
              selected={newTask.dueDate ? new Date(newTask.dueDate) : null}
              onChange={handleDateChange('dueDate')}
              minDate={newTask.startDate ? new Date(newTask.startDate) : undefined}
              className="w-full cursor-pointer rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 pl-10"
              dateFormat="yyyy-MM-dd"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500" size={20} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        disabled={!isFormValid}
      >
        Save Task
      </button>
    </form>
  );
};


export default TaskForm;