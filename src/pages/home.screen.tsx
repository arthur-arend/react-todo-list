import { Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { Card } from "../components/Card/card.component";
import { Filters } from "../components/Filter/filter.component";
import { Header } from "../components/Header/header.component";
import {
  deleteCompletedTasks,
  getTasks,
  postTask,
  toggleAllTasks,
} from "../services/task.service";
import { useTaskStore } from "../store/taskStore";

export function HomeScreen() {
  const { tasks, newTask, filterText, setTasks, setNewTask, getFilteredTasks } =
    useTaskStore();

  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  return (
    <Container>
      <Header />
      <Container sx={{ pt: 4 }}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs>
            <TextField
              size="small"
              label="Nova Tarefa"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              sx={{ height: "100%" }}
              onClick={() =>
                postTask(newTask, () => getTasks(setTasks), setNewTask)
              }
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>

        {tasks == null && (
          <Typography variant="h6" sx={{ pt: 4 }}>
            Carregando...
          </Typography>
        )}

        {tasks && (
          <>
            {tasks.length > 0 && (
              <Container sx={{ pt: 8 }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="stretch"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography variant="h6" sx={{ m: 0 }}>
                      Ações
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={() =>
                        toggleAllTasks(tasks, true, () => getTasks(setTasks))
                      }
                      sx={{ height: "100%" }}
                    >
                      Marcar Tudo como Concluído
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() =>
                        toggleAllTasks(tasks, false, () => getTasks(setTasks))
                      }
                      sx={{ height: "100%" }}
                    >
                      Marcar Tudo como Incompleto
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() =>
                        deleteCompletedTasks(tasks, () => getTasks(setTasks))
                      }
                      sx={{ height: "100%" }}
                    >
                      Remover Concluídas
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            )}

            {tasks.length > 0 && <Filters />}

            <Container sx={{ pt: 4 }}>
              {tasks.length === 0 ? null : (
                <Grid container spacing={4}>
                  {filteredTasks
                    .filter((task) =>
                      task.text.toLowerCase().includes(filterText.toLowerCase())
                    )
                    .map((task, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card task={task} />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
}
