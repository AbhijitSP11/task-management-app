import { useState, useMemo } from 'react';
import { Task } from '@/schema/types';
import { useDispatch } from 'react-redux';
import { setAllTasks } from '@/redux/slices/taskSlice';

const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sortColumn, setSortColumn] = useState<keyof Task | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const dispatch = useDispatch();

  const handleSort = (column: keyof Task) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddTask = (newTask: Partial<Task>) => {
    const taskWithId = { ...newTask, id: Date.now() } as Task;
    setTasks(prevTasks => [taskWithId, ...prevTasks]);
    // Update allTasks in Redux store
    dispatch(setAllTasks([taskWithId, ...tasks]));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [tasks, sortColumn, sortDirection]);

  const currentTasks = useMemo(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  }, [sortedTasks, currentPage, tasksPerPage]);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return {
    tasks,
    currentTasks,
    sortColumn,
    sortDirection,
    currentPage,
    totalPages,
    handleSort,
    handleAddTask,
    setCurrentPage,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTasks;
