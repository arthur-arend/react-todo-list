import { Button, Container, TextField } from "@mui/material";
import { useEffect } from "react";
import { Card } from "./components/Card/card.component";
import { Filters } from "./components/Filter/filter.component";
import { Header } from "./components/Header/header.component";
import {
  deleteCompletedTasks,
  getTasks,
  postTask,
  toggleAllTasks,
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
    <Container>
      <Header />

      <Container
        sx={{
          pt: 4,
        }}
      >
        <TextField
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() =>
            postTask(newTask, () => getTasks(setTasks), setNewTask)
          }
        >
          Adicionar
        </Button>

        <Container sx={{ pt: 4 }}>
          <Button
            onClick={() =>
              toggleAllTasks(tasks, true, () => getTasks(setTasks))
            }
          >
            Marcar Tudo como Concluído
          </Button>
          <Button
            onClick={() =>
              toggleAllTasks(tasks, false, () => getTasks(setTasks))
            }
          >
            Marcar Tudo como Incompleto
          </Button>
          <Button
            onClick={() =>
              deleteCompletedTasks(tasks, () => getTasks(setTasks))
            }
          >
            Deletar Concluídas
          </Button>
        </Container>
        <Filters />
        {filteredTasks
          .filter((task) =>
            task.text.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((task, index) => (
            <Card task={task} key={index} />
          ))}
      </Container>
    </Container>
  );
}
