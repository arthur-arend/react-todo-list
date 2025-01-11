import { create } from "zustand";

interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskStoreState {
  tasks: ITask[];
  newTask: string;
  filterText: string;
  setTasks: (tasks: ITask[]) => void;
  setNewTask: (text: string) => void;
  setFilterText: (text: string) => void;
}

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  tasks: [],
  newTask: "",
  filterText: "",
  setTasks: (tasks) => set({ tasks }),
  setNewTask: (text) => set({ newTask: text }),
  setFilterText: (text) => set({ filterText: text }),
}));
