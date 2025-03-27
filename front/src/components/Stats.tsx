"use client";

import { Task } from "@/types/types";

interface StatsProps {
  tasks: Task[];
}

const Stats = ({ tasks }: StatsProps) => {
  const completedTasks = tasks.filter((task) => task.statut === "Complétée").length;
  const pendingTasks = tasks.filter((task) => task.statut === "En attente").length;
  const totalTasks = tasks.length;

  return (
    <div className="d-flex justify-content-center gap-4 mt-4">
      <div
        className="p-5 text-center text-dark rounded shadow border"
        style={{ backgroundColor: "#F0D1A8", minWidth: "180px" }}
      >
        <h5 className="fw-bold">Completed Tasks</h5>
        <h2 className="fw-bold">{completedTasks.toString().padStart(2, "0")}</h2>
      </div>

      <div
        className="p-5 text-center text-dark rounded shadow border"
        style={{ backgroundColor: "#C4A49F", minWidth: "180px" }}
      >
        <h5 className="fw-bold">Pending Tasks</h5>
        <h2 className="fw-bold">{pendingTasks.toString().padStart(2, "0")}</h2>
      </div>

      <div
        className="p-5 text-center text-dark rounded shadow border"
        style={{ backgroundColor: "white", minWidth: "220px" }}
      >
        <h5 className="fw-bold">Tasks Created</h5>
        <h2 className="fw-bold">{totalTasks.toLocaleString()}</h2>
      </div>
    </div>
  );
};

export default Stats;
