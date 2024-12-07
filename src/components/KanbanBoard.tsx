import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { NewTaskDialog } from "./NewTaskDialog";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useKanbanBoard } from "@/hooks/useKanbanBoard";

export function KanbanBoard() {
  const {
    columns,
    activeTask,
    searchTerm,
    setSearchTerm,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleAddTask,
  } = useKanbanBoard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
            {columns.map((column) => (
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