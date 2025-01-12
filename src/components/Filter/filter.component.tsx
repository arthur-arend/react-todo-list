import { useTaskStore } from "../../store/taskStore";

export const Filters = () => {
  const { filterText, filterStatus, setFilterText, setFilterStatus } =
    useTaskStore();

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Filtrar por texto"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div>
        <button onClick={() => setFilterStatus("All")}>Todas</button>
        <button onClick={() => setFilterStatus("Completed")}>Concluídas</button>
        <button onClick={() => setFilterStatus("Incomplete")}>
          Não Concluídas
        </button>
      </div>
    </div>
  );
};
