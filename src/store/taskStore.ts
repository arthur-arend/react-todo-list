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
  filterStatus: "All" | "Completed" | "Incomplete";
  setTasks: (tasks: ITask[]) => void;
  setNewTask: (text: string) => void;
  setFilterText: (text: string) => void;
  setFilterStatus: (status: "All" | "Completed" | "Incomplete") => void;
}

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  tasks: [],
  newTask: "",
  filterText: "",
  filterStatus: "All",
  setTasks: (tasks) => set({ tasks }),
  setNewTask: (text) => set({ newTask: text }),
  setFilterText: (text) => set({ filterText: text }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}));
