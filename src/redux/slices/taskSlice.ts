import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from '@/schema/types';

interface TaskState {
  allTasks: Task[];
  filteredTasks: Task[];
  selectedTaskId: number | null;
}

const initialState: TaskState = {
  allTasks: [],
  filteredTasks: [],
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      console.log("setAllTasks action", action);
      state.allTasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setFilteredTasks: (state, action: PayloadAction<Task[]>) => {
      state.filteredTasks = action.payload;
    },
    setSelectedTaskId: (state, action: PayloadAction<number | null>) => {
      state.selectedTaskId = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      // Insert the new task at the beginning of the arrays
      state.allTasks.unshift(action.payload);
      state.filteredTasks.unshift(action.payload);
      
      // Sort tasks by priority after adding a new task
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      state.allTasks.sort((a, b) => {
        if (a === action.payload) return -1; // Ensure the newly added task is first
        if (b === action.payload) return 1;  // Ensure the newly added task is first
        return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
      });
      state.filteredTasks.sort((a, b) => {
        if (a === action.payload) return -1; // Ensure the newly added task is first
        if (b === action.payload) return 1;  // Ensure the newly added task is first
        return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
      });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.allTasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.allTasks[index] = action.payload;
        const filteredIndex = state.filteredTasks.findIndex(task => task.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredTasks[filteredIndex] = action.payload;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.allTasks = state.allTasks.filter(task => task.id !== action.payload);
      state.filteredTasks = state.filteredTasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { setAllTasks, setFilteredTasks, setSelectedTaskId, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
