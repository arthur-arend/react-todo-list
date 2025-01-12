import { Button, Container, TextField } from "@mui/material";
import { useTaskStore } from "../../store/taskStore";

export const Filters = () => {
  const { filterText, filterStatus, setFilterText, setFilterStatus } =
    useTaskStore();

  return (
    <Container sx={{ pt: 6, textAlign: "start" }}>
      <TextField
        type="text"
        placeholder="Filtrar por texto"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div>
        <Button onClick={() => setFilterStatus("All")}>Todas</Button>
        <Button onClick={() => setFilterStatus("Completed")}>Concluídas</Button>
        <Button onClick={() => setFilterStatus("Incomplete")}>
          Não Concluídas
        </Button>
      </div>
    </Container>
  );
};
