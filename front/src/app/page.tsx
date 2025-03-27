"use client"
import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import Stats from "@/components/Stats";
import Calendar from "@/components/Calendar";
import TaskForm from "@/components/TaskForm";
import EditTaskForm from "@/components/EditTaskForm";
import TaskFilter from "@/components/TaskFilter";
import TaskResearch from "@/components/TaskResearch"; 
import { Task } from "@/types/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/tasks");
      const responseData = await response.json();
      if (!response.ok) throw new Error("Erreur lors de la récupération des tâches");
      setTasks(responseData.data);
      setFilteredTasks(responseData.data);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      filterStatus ? task.statut === filterStatus : true
    );
    setFilteredTasks(filtered);
  }, [filterStatus, tasks]);

  const addTask = (newTask: Task) => {
    try {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  const deleteTask = async (taskId: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      try {
        const response = await fetch(`http://localhost:1337/api/tasks/${taskId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression de la tâche");
        setTasks((prevTasks) => prevTasks.filter((task) => task.documentId !== taskId));
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
      }
    }
  };

  const updateTask = (updatedTask: Task) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.documentId === updatedTask.documentId ? updatedTask : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.documentId === updatedTask.documentId ? updatedTask : task
        )
      );
      setTaskToEdit(null);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:1337/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            statut: status,
          },
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.documentId === taskId ? updatedTask.data : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.documentId === taskId ? updatedTask.data : task
        )
      );
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
    }
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="app-container">
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: "black" }}>
          Bonjour, TEKANDME, Commencer le planning
        </h1>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <Calendar tasks={tasks} />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {taskToEdit && (
              <div
                className="modal fade show"
                id="editTaskModal"
                tabIndex={-1}
                aria-labelledby="editTaskModalLabel"
                style={{ display: "block", paddingRight: "17px" }}
                aria-hidden="false"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editTaskModalLabel">
                        
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setTaskToEdit(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <EditTaskForm
                        task={taskToEdit}
                        updateTask={updateTask}
                        cancelEdit={() => setTaskToEdit(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!taskToEdit && <TaskForm addTask={addTask} />}

            <div className="row mb-4 d-flex justify-content-between">
  <div className="col-md-6">
    <TaskResearch onSearch={handleSearch} />
  </div>
  <div className="col-md-6 text-end">
    <TaskFilter onFilterChange={setFilterStatus} />

  </div>
</div>

            <TaskList
              tasks={filteredTasks}
              editTask={setTaskToEdit}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <Stats tasks={tasks} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
