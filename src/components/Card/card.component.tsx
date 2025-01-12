import { Button, Container, Paper, TextField } from "@mui/material";
import React from "react";
import { ITask } from "../../domain/interfaces/ITask.interface";
import {
  deleteTask,
  editTask,
  getTasks,
  toggleTaskCompletion,
} from "../../services/task.service";
import { useTaskStore } from "../../store/taskStore";

interface ICardProps {
  key: number;
  task: ITask;
}

export const Card: React.FC<ICardProps> = (props) => {
  const { setTasks } = useTaskStore();

  return (
    <Paper key={props.task.id} elevation={3}>
      <Container
        sx={{ maxWidth: 300, margin: "0 auto", boxShadow: 3, borderRadius: 2 }}
      >
        <TextField
          variant="standard"
          disabled={true}
          value={props.task.text}
          onChange={(e) =>
            editTask(props.task.id, e.target.value, () => getTasks(setTasks))
          }
        />
      </Container>
      <Container>
        <Button
          onClick={() =>
            toggleTaskCompletion(props.task, () => getTasks(setTasks))
          }
        >
          {props.task.completed ? "Desmarcar" : "Concluir"}
        </Button>
        <Button
          variant="contained"
          onClick={() => deleteTask(props.task.id, () => getTasks(setTasks))}
        >
          Remover
        </Button>
      </Container>
    </Paper>
  );
};
