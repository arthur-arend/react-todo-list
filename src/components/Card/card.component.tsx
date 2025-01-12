import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
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
  task: ITask;
}

export const Card: React.FC<ICardProps> = ({ task }) => {
  const [edit, setEdit] = React.useState(false);
  const [taskEdit, setTaskEdit] = React.useState<ITask>(task);
  const { setTasks } = useTaskStore();

  function completeFactory(value: boolean) {
    if (value) {
      return "Completada";
    }

    return "Incompleta";
  }

  return (
    <Paper
      sx={{
        maxWidth: 300,
        margin: "0 auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: task.completed ? "grey.200" : "white",
      }}
    >
      <CardContent>
        {edit ? (
          <TextField
            variant="standard"
            value={taskEdit.text}
            onChange={(e) =>
              setTaskEdit({
                ...taskEdit,
                text: e.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => {
                      editTask(taskEdit.id, taskEdit.text, () => {
                        getTasks(setTasks);
                      });
                      setEdit(false);
                    }}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {task.text || "Tarefa sem Nome"}
            <IconButton
              size="small"
              onClick={() => {
                setTaskEdit(task);
                setEdit(!edit);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          Status: {completeFactory(task.completed)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => toggleTaskCompletion(task, () => getTasks(setTasks))}
        >
          {task.completed ? "Desmarcar" : "Concluir"}
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => deleteTask(task.id, () => getTasks(setTasks))}
        >
          Remover
        </Button>
      </CardActions>
    </Paper>
  );
};
