import { useEffect } from "react";
import { Filters } from "./components/Filter/filter.component";
import { Header } from "./components/Header/header.component";
import {
  deleteCompletedTasks,
  deleteTask,
  editTask,
  getTasks,
  postTask,
  toggleAllTasks,
  toggleTaskCompletion,
} from "./services/task.service";
import { useTaskStore } from "./store/taskStore";

export function App() {
  const { tasks, newTask, filterText, setTasks, setNewTask, getFilteredTasks } =
    useTaskStore();

  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  return (
    <div>
      <Header />

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

      <Filters />

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
        <button
          onClick={() => deleteCompletedTasks(tasks, () => getTasks(setTasks))}
        >
          Deletar Concluídas
        </button>
      </div>

      <ul>
        {filteredTasks
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
