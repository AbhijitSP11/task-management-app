import React, { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Task } from '@/schema/types';
import TaskTable from '@/components/TaskTable';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import EditTaskModal from '@/components/EditTaskModal';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addTask, setAllTasks, updateTask, deleteTask } from '@/redux/slices/taskSlice';
import { PlusCircle } from 'lucide-react';
import Head from 'next/head';

export default function Home ({ initialTasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const tasks = useAppSelector((state) => state.task.allTasks);
  const selectedTaskId = useAppSelector((state) => state.task.selectedTaskId);
  
  const [sortColumn, setSortColumn] = useState<keyof Task>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only set initial tasks if the Redux state is empty
    if (tasks.length === 0) {
      dispatch(setAllTasks(initialTasks));
    }
  }, [dispatch, initialTasks, tasks.length]);

  const priorityOrder = useMemo(() => new Map([
    ['High', 0],
    ['Medium', 1],
    ['Low', 2],
  ]), []);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const priorityA = priorityOrder.get(a.priority!) ?? 3;
      const priorityB = priorityOrder.get(b.priority!) ?? 3;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
  
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
  
      if (valueA === undefined || valueB === undefined) return 0;
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tasks, sortColumn, sortDirection, priorityOrder]);
  
  const currentTasks = useMemo(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  }, [sortedTasks, currentPage]);

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const handleSort = (column: keyof Task) => {
    setSortColumn(column);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleAddTask = (newTask: Partial<Task>) => {
    const task = { ...newTask, id: Date.now() } as Task;
    dispatch(addTask(task));
    setCurrentPage(1);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
    setCurrentPage(1);
  };

  const onEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const onCloseEditModal = () => {
    setEditingTask(null);
  };

  const onSaveEditedTask = (updatedTask: Task) => {
    handleUpdateTask(updatedTask);
    setEditingTask(null);
  };

  const filteredTasks = useMemo(() => {
    return selectedTaskId
      ? currentTasks.filter(task => task.id === selectedTaskId)
      : currentTasks;
  }, [selectedTaskId, currentTasks]);

  const onAddTask = (newTask: Partial<Task>) => {
    handleAddTask(newTask);
    setShowAddModal(false);
    setCurrentPage(1);
  };

  return (
    <>
     <Head>
        <title>Twello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className='w-full px-4'>
      <div className="mb-4 flex items-center space-x-4">
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setShowAddModal(true)}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Task
        </button>
      </div>

      <TaskTable
        tasks={filteredTasks}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onEditTask={onEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <TaskForm onAddTask={onAddTask} onClose={() => setShowAddModal(false)} />
      </Modal>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={onCloseEditModal}
          onSave={onSaveEditedTask}
        />
      )}
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ initialTasks: Task[] }> = async () => {
  const { Tasks } = await import('@/schema/tasks');
  return { props: { initialTasks: Tasks } };
};
