import axios from "axios";
import { useEffect, useState } from "react";

interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks/");

      if (response.data) {
        setTasks(response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
      return null;
    }
  };

  const postTask = async (task: string) => {
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
        getTasks();
        setNewTask("");
      }
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
      return null;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`);

      if (response.data) {
        getTasks();
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      return null;
    }
  };

  const editTask = async (taskId: number, newText: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        { text: newText }
      );

      if (response.data) {
        getTasks();
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
      return null;
    }
  };

  const toggleTaskCompletion = async (taskId: ITask) => {
    console.log(taskId);
    try {
      const response = await axios.patch(
        `http://localhost:3000/tasks/${taskId.id}`,
        { completed: !taskId.completed }
      );

      if (response.data) {
        getTasks();
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao completar a tarefa:", error);
      return null;
    }
  };

  const toggleAllTasks = async (completedStatus: boolean) => {
    try {
      const updatedTasks = tasks.map(async (task) => {
        await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
          completed: completedStatus,
        });
      });

      await Promise.all(updatedTasks);
      getTasks();
    } catch (error) {
      console.error("Erro ao atualizar todas as tarefas:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={() => postTask(newTask)}>Adicionar</button>

      <input
        type="text"
        placeholder="Filtrar por texto"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div>
        <button onClick={() => toggleAllTasks(true)}>
          Marcar Tudo como Concluído
        </button>
        <button onClick={() => toggleAllTasks(false)}>
          Marcar Tudo como Incompleto
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(task.id, e.target.value)}
            />
            <button onClick={() => toggleTaskCompletion(task)}>
              {task.completed ? "Desmarcar" : "Concluir"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
