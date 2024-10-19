import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="w-full border-y border-gray-300 p-2 flex justify-center items-center mt-6">
      <ul className="flex list-none space-x-2">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, idx) => (
          <li key={idx}>
            <button
              onClick={() => onPageChange(idx + 1)}
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
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
