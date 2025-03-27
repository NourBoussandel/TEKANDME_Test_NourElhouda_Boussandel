"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "@/types/types";

interface CalendarProps {
  tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState<Task[]>([]);

  const getDatesInRange = (startDate: Date, dueDate: Date): Date[] => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= dueDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    if (selectedDate) {
      const filteredTasks = tasks.filter((task) => {
        const startDate = new Date(task.startDate);
        const dueDate = new Date(task.dueDate);

        return getDatesInRange(startDate, dueDate).some(
          (date) => date.toLocaleDateString() === selectedDate.toLocaleDateString()
        );
      });
      setTasksForSelectedDate(filteredTasks);
    }
  }, [selectedDate, tasks]);

  return (
    <div className="card p-3 shadow-lg border-0 bg-light w-100">
      <div className="text-center">
        <h2 className="fw-bold mb-2" style={{ fontFamily: "cursive", fontSize: "2rem", color: "#F87777" }}>
          {selectedDate
            ? selectedDate.toLocaleDateString("fr-FR", { weekday: "long" })
            : "Aucune date sélectionnée"}
        </h2>

        <h4 className="fw-bold">
          {selectedDate
            ? selectedDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
            : ""}
        </h4>
      </div>

      <div className="mt-3 d-flex justify-content-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          inline
          className="border border-secondary p-3 rounded w-100"
        />
      </div>

      <div className="mt-4">
        <h5 className="fw-bold">{tasksForSelectedDate.length} tâche(s) pour cette date</h5>
        <div className="mt-3">
          {tasksForSelectedDate.length > 0 ? (
            tasksForSelectedDate.map((task) => (
              <div
                key={task.documentId}
                className="p-3 mb-3 rounded shadow-sm border"
                style={{ backgroundColor: "#F0D1A8" }}
              >
                <h6 className="fw-bold">{task.title}</h6>
                <p className="text-muted">{task.description}</p>
                <span
                  className={`badge px-3 py-2 ${
                    task.statut === "Complétée" ? "bg-success" : "bg-warning"
                  } text-white`}
                >
                  {task.statut === "Complétée" ? "✔️ Complétée" : "⏳ En attente"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted">Aucune tâche pour cette date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
