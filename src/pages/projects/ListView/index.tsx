import { Tasks } from '@/schema/tasks';
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react'; 


const ListView = () => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const handleSort = (column: string) => {
      if (sortColumn === column) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
          setSortColumn(column);
          setSortDirection('asc');
      }
  };

  const sortedTasks = [...Tasks].sort((a, b) => {
      if (!sortColumn) return 0;

      let aValue = (a as any)[sortColumn];
      let bValue = (b as any)[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(Tasks.length / tasksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
      <div className='w-full px-4 py-6'>
          <div className='overflow-x-auto border border-gray-300 rounded-lg'>
              <table className='min-w-full bg-white shadow-md'>
                  <thead className='bg-gray-100 text-gray-500 font-semibold'>
                      <tr>
                          {['title', 'description', 'assignedUserId', 'dueDate', 'startDate', 'priority'].map((col, idx) => (
                              <th
                                  key={idx}
                                  className='px-6 py-4 text-left cursor-pointer hover:text-blue-500'
                                  onClick={() => handleSort(col)}
                              >
                                  {col.charAt(0).toUpperCase() + col.slice(1)}
                                  <span className='ml-2 inline-flex'>
                                      {/* Show sorting icons by default */}
                                      <ChevronUp 
                                          className={`w-4 h-4 ${sortColumn === col && sortDirection === 'asc' 
                                              ? 'text-blue-500' 
                                              : 'text-gray-400'}`} 
                                      />
                                      <ChevronDown 
                                          className={`w-4 h-4 ${sortColumn === col && sortDirection === 'desc' 
                                              ? 'text-blue-500' 
                                              : 'text-gray-400'}`} 
                                      />
                                  </span>
                              </th>
                          ))}
                      </tr>
                  </thead>
                  <tbody>
                      {currentTasks.map((task) => (
                          <tr key={task.id} className='border-t border-gray-200 hover:bg-gray-50'>
                              <td className='px-6 py-4'>{task.title}</td>
                              <td className='px-6 py-4'>{task.description}</td>
                              <td className='px-6 py-4'>{task.assignedUserId}</td>
                              <td className='px-6 py-4'>{task.dueDate}</td>
                              <td className='px-6 py-4'>{task.startDate}</td>
                              <td className='px-6 py-4'>{task.priority}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          {/* Pagination */}
          <div className="w-full border-y border-gray-300 p-2 flex justify-center items-center mt-6">
            <div className='text-center text-gray-500 mt-4'>
                Showing {currentTasks.length} of {Tasks.length} tasks
            </div>
            <div>
                <ul className="flex list-none space-x-2">
                    <li>
                        <button
                            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => paginate(idx + 1)}
                                className={`px-4 py-2 rounded ${currentPage === idx + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div>
          </div>
      </div>
  );
};


export default ListView;
