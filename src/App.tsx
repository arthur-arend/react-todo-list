import { useEffect } from "react";
import {
  deleteTask,
  editTask,
  getTasks,
  postTask,
  toggleAllTasks,
  toggleTaskCompletion,
} from "./services/task.service";
import { useTaskStore } from "./taskStore";

export function App() {
  const { tasks, newTask, filterText, setTasks, setNewTask, setFilterText } =
    useTaskStore();

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        onClick={() => postTask(newTask, () => getTasks(setTasks), setNewTask)}
      >
        Adicionar
      </button>

      <input
        type="text"
        placeholder="Filtrar por texto"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div>
        <button
          onClick={() => toggleAllTasks(tasks, true, () => getTasks(setTasks))}
        >
          Marcar Tudo como Concluído
        </button>
        <button
          onClick={() => toggleAllTasks(tasks, false, () => getTasks(setTasks))}
        >
          Marcar Tudo como Incompleto
        </button>
      </div>

      <ul>
        {tasks
          .filter((task) =>
            task.text.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((task) => (
            <li key={task.id}>
              <input
                type="text"
                value={task.text}
                onChange={(e) =>
                  editTask(task.id, e.target.value, () => getTasks(setTasks))
                }
              />
              <button
                onClick={() =>
                  toggleTaskCompletion(task, () => getTasks(setTasks))
                }
              >
                {task.completed ? "Desmarcar" : "Concluir"}
              </button>
              <button
                onClick={() => deleteTask(task.id, () => getTasks(setTasks))}
              >
                Remover
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
