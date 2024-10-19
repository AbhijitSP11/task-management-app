import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedTaskId } from '@/redux/slices/taskSlice';
import { Task } from '@/schema/types';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Modal from '../Modal';
import { SearchIcon, Loader, Calendar, CheckCircle, ArrowUpCircle, AlertCircle, Clock } from 'lucide-react';
import debounce from 'lodash/debounce';

interface Props {
  onClose: () => void;
}

const Search: React.FC<Props> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const allTasks = useAppSelector((state) => state.task.allTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setIsLoading(true);
      const filtered = term
        ? allTasks.filter((task: Task) => 
            Object.values(task).some(value => 
              value && value.toString().toLowerCase().includes(term.toLowerCase())
            )
          )
        : [];
      setFilteredTasks(filtered);
      setIsLoading(false);
    }, 300),
    [allTasks]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if(term === ""){
      dispatch(setSelectedTaskId(null));
    }
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleTaskSelect = (taskId: number) => {
    dispatch(setSelectedTaskId(taskId));
    setIsModalOpen(false);
    onClose();
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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

  return (
    <>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <Modal show={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setSearchTerm('');
        setFilteredTasks([]);
        dispatch(setSelectedTaskId(null));
      }}>
        <div className="p-4">
          <div className='flex items-center gap-2 mb-4'>
            <span className='flex items-center justify-center p-2 border border-blue-300 shadow-md rounded-lg bg-gray-100'>
              <SearchIcon className='size-4 text-blue-500'/>
            </span>
            <h2 className="text-lg">Global Search</h2>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
            className="w-full p-2 border rounded-md mb-4"
            autoFocus
          />
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader className="animate-spin" size={24} />
            </div>
          ) : searchTerm && (
            <>
              <h3 className="font-semibold mb-2">Suggestions:</h3>
              {filteredTasks.length > 0 ? (
                <ul>
                  {filteredTasks.map((task) => (
                    <li key={task.id} className="mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => handleTaskSelect(task.id)}>
                      <div className="flex items-center">
                        {getStatusIcon(task.status || 'Unknown')}
                        <span className="font-medium ml-2">{task.title}</span>
                      </div>
                      {task.description && (
                        <p className="text-xs text-gray-600 mt-1 ml-7">{task.description}</p>
                      )}
                      <div className="flex items-center mt-1 ml-7 text-xs text-gray-500">
                        {task.startDate && (
                          <div className="flex items-center mr-4">
                            <Calendar size={12} className="mr-1" />
                            <span>Start: {formatDate(task.startDate)}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks found.</p>
              )}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Search;
