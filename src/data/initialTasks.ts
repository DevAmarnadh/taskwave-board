import { Column } from "@/types/kanban";

export const initialColumns: Column[] = [
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
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "2",
        title: "User authentication",
        description: "Implement user authentication flow",
        status: "in-progress",
      },
    ],
  },
  {
    id: "review",
    title: "Peer Review",
    tasks: [
      {
        id: "3",
        title: "Design system",
        description: "Create a consistent design system for the application",
        status: "review",
      },
    ],
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