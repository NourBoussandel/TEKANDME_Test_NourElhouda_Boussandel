"use client";

import React from "react";
import { Task } from "@/types/types";

interface TaskListProps {
  tasks: Task[];
  editTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: string) => void;
}

const TaskList = ({ tasks, editTask, deleteTask, updateTaskStatus }: TaskListProps) => {
  const handleStatusChange = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "En attente" ? "Complétée" : "En attente";
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="mt-4">
      {tasks.length > 0 ? (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.documentId} className="col-md-6 mb-3">
              <div
                className="card p-3 shadow-sm border-0 text-dark"
                style={{ backgroundColor: "#F0D1A8" }} 
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">{task.title}</h5>
                  <div>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => editTask(task)}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.documentId)}>🗑</button>
                  </div>
                </div>

                <p className="small mt-2">{task.description}</p>

                <p className="mb-2">
                  <strong>Début :</strong> {task.startDate} | <strong>Échéance :</strong> {task.dueDate}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <span
                    className={`badge cursor-pointer ${task.statut === "Complétée" ? "bg-success" : "bg-dark"} text-white`}
                    onClick={() => handleStatusChange(task.documentId, task.statut)}
                  >
                    {task.statut === "Complétée" ? "✔️ Complétée" : "⏳ En attente"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">Aucune tâche disponible</p>
      )}
    </div>
  );
};

export default TaskList;
