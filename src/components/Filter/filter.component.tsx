import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useTaskStore } from "../../store/taskStore";

export const Filters = () => {
  const { filterText, filterStatus, setFilterText, setFilterStatus } =
    useTaskStore();

  return (
    <Container sx={{ pt: 4 }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Filtrar por:
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField
            size="small"
            fullWidth
            type="text"
            placeholder="Filtrar por texto"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Button
            sx={{ height: "100%", mr: 1 }}
            onClick={() => setFilterStatus("All")}
          >
            Todas
          </Button>
          <Button
            sx={{ height: "100%", mr: 1 }}
            onClick={() => setFilterStatus("Completed")}
          >
            Concluídas
          </Button>
          <Button
            sx={{ height: "100%", mr: 1 }}
            onClick={() => setFilterStatus("Incomplete")}
          >
            Não Concluídas
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
