import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "./store";

interface ITask {
  id: number;
  name: string;
  completed: boolean;
}

interface ITasksState {
  tasks: ITask[];
  filter: "all" | "completed" | "current";
}

const initialState: ITasksState = {
  tasks: [],
  filter: "all",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: state.tasks.length + 1,
        name: action.payload,
        completed: false,
      };
      if (action.payload.length <= 10) {
        state.tasks.push(newTask);
      }
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(
        (singleTask) => singleTask.id === action.payload
      );
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "current">
    ) => {
      state.filter = action.payload;
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const selectTasks = (state: TypeRootState) => state.tasks.tasks;
export const selectFilter = (state: TypeRootState) => state.tasks.filter;

export default tasksSlice.reducer;
