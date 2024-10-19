import React, { useState, useEffect } from 'react';
import { Task } from '@/schema/types';
import {  EditIcon, X } from 'lucide-react';
import Select from 'react-select';
import { priorityOptions, statusOptions } from '@/constants/constants';

interface EditTaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: '#D1D5DB', // gray-300
      '&:hover': { borderColor: '#6366F1' }, // indigo-500
      boxShadow: 'none',
      minHeight: '42px',
    }),
    option: (base: any, { isFocused }: any) => ({
      ...base,
      backgroundColor: isFocused ? '#E0E7FF' : null, // indigo-100 on hover
      color: '#000',
    }),
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <div className='flex items-center gap-2 mb-4'>
        <span><EditIcon className='size-6 text-indigo-500'/></span>
        <h2 className="text-xl font-semibold text-gray-600">Edit Task</h2>
      </div>
        <form className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 px-3" // Added height and padding
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={editedTask.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-24 px-3 py-2" // Increased height and added padding
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select
                name="status"
                value={statusOptions.find(option => option.value === editedTask.status)}
                onChange={(selectedOption: any) =>
                  setEditedTask({ ...editedTask, status: selectedOption.value })
                }
                options={statusOptions}
                getOptionLabel={(option: any) => option.label}
                formatOptionLabel={(option: any) => (
                  <div className="flex items-center space-x-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                )}
                getOptionValue={(option: any) => option.value}
                styles={customSelectStyles}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <Select
                name="priority"
                value={priorityOptions.find(option => option.value === editedTask.priority)}
                onChange={(selectedOption: any) =>
                  setEditedTask({ ...editedTask, priority: selectedOption.value })
                }
                options={priorityOptions}
                getOptionLabel={(option: any) => option.label}
                formatOptionLabel={(option: any) => (
                  <div className="flex items-center space-x-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                )}
                getOptionValue={(option: any) => option.value}
                styles={customSelectStyles}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={editedTask.startDate || ''}
                  onChange={handleChange}
                  className="mt-1 cursor-pointer block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 px-3" // Added height and padding
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate || ''}
                  onChange={handleChange}
                  className="mt-1 cursor-pointer block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 px-3" // Added height and padding
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 h-10" // Added height
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
