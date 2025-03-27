"use client";

import { useState } from "react";

interface TaskResearchProps {
  onSearch: (query: string) => void;
}

const TaskResearch = ({ onSearch }: TaskResearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4 input-group">
      <span className="input-group-text">
        <i className="bi bi-search"></i> 
      </span>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Rechercher une tâche par titre ou description"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default TaskResearch;
