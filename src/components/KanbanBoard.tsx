import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task, TaskStatus } from "@/types/kanban";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { NewTaskDialog } from "./NewTaskDialog";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Research competitors",
        description: "Analyze main competitors and their features",
        status: "todo",
      },
      {
        id: "2",
        title: "Design system",
        description: "Create a consistent design system for the application",
        status: "todo",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "User authentication",
        description: "Implement user authentication flow",
        status: "in-progress",
      },
    ],
  },
  {
    id: "review",
    title: "Peer Review",
    tasks: [],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "4",
        title: "Project setup",
        description: "Initialize project and install dependencies",
        status: "done",
      },
    ],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const findTask = (id: string): Task | undefined => {
    return columns.flatMap((col) => col.tasks).find((task) => task.id === id);
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "status">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      status: "todo",
    };

    setColumns((columns) =>
      columns.map((col) =>
        col.id === "todo"
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      )
    );
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-kanban-background p-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 max-w-md"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {filteredColumns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      <NewTaskDialog onAddTask={handleAddTask} />
    </div>
  );
}