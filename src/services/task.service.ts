import axios from "axios";

interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

export const getTasks = async (setTasks: (tasks: ITask[]) => void) => {
  try {
    const response = await axios.get("http://localhost:3000/tasks/");
    if (response.data) {
      setTasks(response.data);
    }
  } catch (error) {
    console.error("Erro ao carregar as tarefas:", error);
  }
};

export const postTask = async (
  task: string,
  getTasks: () => void,
  setNewTask: (text: string) => void
) => {
  const newTaskObj = {
    text: task,
    completed: false,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/tasks/",
      newTaskObj
    );
    if (response.data) {
      await getTasks();
      setNewTask("");
    }
  } catch (error) {
    console.error("Erro ao adicionar a tarefa:", error);
  }
};

export const deleteTask = async (id: number, getTasks: () => void) => {
  try {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    await getTasks();
  } catch (error) {
    console.error("Erro ao deletar a tarefa:", error);
  }
};

export const editTask = async (
  taskId: number,
  newText: string,
  getTasks: () => void
) => {
  try {
    await axios.put(`http://localhost:3000/tasks/${taskId}`, { text: newText });
    await getTasks();
  } catch (error) {
    console.error("Erro ao editar a tarefa:", error);
  }
};

export const toggleTaskCompletion = async (
  task: ITask,
  getTasks: () => void
) => {
  try {
    await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
      completed: !task.completed,
    });
    await getTasks();
  } catch (error) {
    console.error("Erro ao completar a tarefa:", error);
  }
};

export const toggleAllTasks = async (
  tasks: ITask[],
  completedStatus: boolean,
  getTasks: () => void
) => {
  try {
    const updatedTasks = tasks.map(async (task) => {
      await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
        completed: completedStatus,
      });
    });

    await Promise.all(updatedTasks);
    await getTasks();
  } catch (error) {
    console.error("Erro ao atualizar todas as tarefas:", error);
  }
};

export const deleteCompletedTasks = async (
  tasks: ITask[],
  getTasks: () => void
) => {
  try {
    const deletePromises = tasks
      .filter((task) => task.completed)
      .map(async (task) => {
        await axios.delete(`http://localhost:3000/tasks/${task.id}`);
      });

    await Promise.all(deletePromises);
    await getTasks();
  } catch (error) {
    console.error("Erro ao excluir tarefas concluídas:", error);
  }
};
