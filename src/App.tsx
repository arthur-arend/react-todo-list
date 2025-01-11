import { useEffect } from "react";
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
  const {
    tasks,
    newTask,
    filterText,
    filterStatus,
    setTasks,
    setNewTask,
    setFilterText,
    setFilterStatus,
  } = useTaskStore();

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const filteredTasks = tasks
    .filter((task) =>
      task.text.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((task) => {
      if (filterStatus === "Completed") return task.completed;
      if (filterStatus === "Incomplete") return !task.completed;
      return true;
    });

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

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por texto"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <div>
          <button onClick={() => setFilterStatus("All")}>Todas</button>
          <button onClick={() => setFilterStatus("Completed")}>
            Concluídas
          </button>
          <button onClick={() => setFilterStatus("Incomplete")}>
            Não Concluídas
          </button>
        </div>
      </div>

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
