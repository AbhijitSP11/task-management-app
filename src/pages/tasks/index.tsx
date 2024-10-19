import React, { useState, useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Task } from '@/schema/types';
import TaskTable from '@/components/TaskTable';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import EditTaskModal from '@/components/EditTaskModal';
import useTasks from '@/hooks/useTasks';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setAllTasks } from '@/redux/slices/taskSlice';
import { PlusCircle } from 'lucide-react';

const TasksPage = ({ initialTasks }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const selectedTaskId = useAppSelector((state) => state.task.selectedTaskId);
  const {
    currentTasks,
    sortColumn,
    sortDirection,
    currentPage,
    totalPages,
    handleSort,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    setCurrentPage,
  } = useTasks(initialTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAllTasks(initialTasks));
  }, [dispatch, initialTasks]);

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

  const filteredTasks = selectedTaskId
    ? currentTasks.filter(task => task.id === selectedTaskId)
    : currentTasks;

  const onAddTask = (newTask: Partial<Task>) => {
    handleAddTask(newTask);
    setShowAddModal(false);
    // Optionally, you can reset the current page to 1 to ensure the new task is visible
    setCurrentPage(1);
  };

  return (
    <div className='w-full px-4 py-6'>
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
  );
};

export const getServerSideProps: GetServerSideProps<{ initialTasks: Task[] }> = async () => {
  const { Tasks } = await import('@/schema/tasks');
  return { props: { initialTasks: Tasks } };
};

export default TasksPage;
