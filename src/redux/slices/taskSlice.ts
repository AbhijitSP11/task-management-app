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
      state.allTasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setFilteredTasks: (state, action: PayloadAction<Task[]>) => {
      state.filteredTasks = action.payload;
    },
    setSelectedTaskId: (state, action: PayloadAction<number | null>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const { setAllTasks, setFilteredTasks, setSelectedTaskId } = taskSlice.actions;
export default taskSlice.reducer;
