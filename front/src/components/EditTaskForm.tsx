"use client";

import { useState } from "react";
import { Task } from "@/types/types";

interface EditTaskFormProps {
  task: Task;
  updateTask: (updatedTask: Task) => void;
  cancelEdit: () => void;
}

const EditTaskForm = ({ task, updateTask, cancelEdit }: EditTaskFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(task.startDate || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:1337/api/tasks/${task.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title,
            description,
            startDate,
            dueDate,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la tâche");
      }

      const updatedTaskData = await response.json();
      updateTask(updatedTaskData.data);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg mb-3">
      <h4 className="text-center mb-4" style={{ color: "black" }}>Modifier la tâche</h4>
      
      <div className="form-group mb-3">
        <label htmlFor="title" className="form-label">Titre</label>
        <input
          type="text"
          className="form-control shadow-sm"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la tâche"
        />
      </div>
      
      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control shadow-sm"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Détaillez la tâche"
        />
      </div>
      
      <div className="form-group mb-3">
        <label htmlFor="startDate" className="form-label">Date de début</label>
        <input
          type="date"
          className="form-control shadow-sm"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      
      <div className="form-group mb-3">
        <label htmlFor="dueDate" className="form-label">Date échéance</label>
        <input
          type="date"
          className="form-control shadow-sm"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn me-2 px-4 py-2" style={{ backgroundColor: "#5C9967", color : "white"}}>Enregistrer</button>
        <button type="button" className="btn btn-secondary px-4 py-2" onClick={cancelEdit}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
