import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task, TaskStatus } from "@/types/kanban";
import { initialColumns } from "@/data/initialTasks";

export function useKanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const findTask = (id: string): Task | undefined => {
    return columns.flatMap((col) => col.tasks).find((task) => task.id === id);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = findTask(event.active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = findTask(active.id as string);
    const overColumn = columns.find((col) => col.id === over.id);

    if (!activeTask || !overColumn) return;

    setColumns((columns) => {
      const oldColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === activeTask.id)
      );

      if (!oldColumn) return columns;

      return columns.map((col) => {
        if (col.id === oldColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== activeTask.id),
          };
        }
        if (col.id === overColumn.id) {
          return {
            ...col,
            tasks: [...col.tasks, { ...activeTask, status: col.id as TaskStatus }],
          };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeTask = findTask(active.id as string);
    const overTask = findTask(over.id as string);

    if (!activeTask || !overTask || activeTask.status !== overTask.status) return;

    setColumns((columns) => {
      const column = columns.find((col) => col.id === activeTask.status);
      if (!column) return columns;

      const oldIndex = column.tasks.findIndex((task) => task.id === active.id);
      const newIndex = column.tasks.findIndex((task) => task.id === over.id);

      return columns.map((col) => {
        if (col.id === activeTask.status) {
          return {
            ...col,
            tasks: arrayMove(col.tasks, oldIndex, newIndex),
          };
        }
        return col;
      });
    });
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "status">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      status: "todo",
    };

    setColumns((columns) =>
      columns.map((col) =>
        col.id === "todo" ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return {
    columns: filteredColumns,
    activeTask,
    searchTerm,
    setSearchTerm,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddTask,
  };
}