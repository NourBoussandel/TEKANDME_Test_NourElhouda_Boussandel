"use client";

import { useState } from "react";
import { Task } from "../types/types"; 

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [statut, setStatut] = useState("En attente");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && description && startDate && dueDate && statut) {
      try {
        const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
        const formattedDueDate = new Date(dueDate).toISOString().split("T")[0];

        const response = await fetch("http://localhost:1337/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: { title, description, startDate: formattedStartDate, dueDate: formattedDueDate, statut },
          }),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de la tâche");
        console.log("Request body:", JSON.stringify({ data: { title, description, startDate: formattedStartDate, dueDate: formattedDueDate, statut } }));

        const responseData = await response.json();
        console.log(responseData);
        addTask(responseData.data);
        
        setTitle("");
        setDescription("");
        setStartDate("");
        setDueDate("");
        setStatut("En attente");
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Entrez la description"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <select 
          className="form-select w-50" 
          value={statut} 
          onChange={(e) => setStatut(e.target.value)}
        >
          <option value="En attente">En attente</option>
          <option value="Complétée">Complétée</option>
        </select>

        <button 
          type="submit" 
          className="btn d-flex align-items-center"
          style={{ backgroundColor: "#5C9967", color: "white" }}
        >
          <i className="bi bi-plus-lg me-2"></i>
          <span>Ajouter</span>
        </button>
      </div>
      
    </form>
  );
};

export default TaskForm;
