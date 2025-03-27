"use client";

import { useState } from "react";

interface TaskFilterProps {
  onFilterChange: (status: string) => void;
}

const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="d-flex mb-3 align-items-center">
      <i  className="bi bi-filter" style={{ fontSize: "1.5rem" }}></i>
      
      <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={status} onChange={handleChange}>
        <option value="">Filtrer</option>
        <option value="Complétée">Complétée</option>
        <option value="En attente">En attente</option>
      </select>
    </div>
  );
};

export default TaskFilter;
