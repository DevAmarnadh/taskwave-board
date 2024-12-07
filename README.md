# React Kanban Board

A modern, responsive Kanban board application built with React, TypeScript, and Tailwind CSS. This application helps teams manage tasks across different stages of completion with a beautiful and intuitive user interface.

![Kanban Board Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1200)

## Features

- **Drag and Drop**: Intuitive drag-and-drop functionality for moving tasks between columns
- **Real-time Search**: Filter tasks across all columns as you type
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and professional interface with smooth animations
- **Type-Safe**: Built with TypeScript for improved reliability
- **State Management**: Efficient state management using Zustand

## Tech Stack

- **React** - Frontend framework
- **TypeScript** - Type safety and improved developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **@dnd-kit** - Drag and drop functionality
- **Zustand** - State management
- **Vite** - Build tool and development server
- **Lucide React** - Modern icon set

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Column.tsx      # Kanban column component
│   ├── TaskCard.tsx    # Individual task card
│   ├── SearchBar.tsx   # Search functionality
│   └── NewTaskDialog.tsx # New task creation modal
├── store/
│   └── useTaskStore.ts # Zustand state management
├── types/
│   └── task.ts         # TypeScript interfaces
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Usage

### Creating Tasks

1. Click the "New Task" button in the top-right corner
2. Fill in the task title and description
3. Click "Create Task" to add it to the "To Do" column

### Moving Tasks

- Drag and drop tasks between columns
- Tasks can be moved to any column: To Do, In Progress, Peer Review, or Done

### Searching Tasks

- Use the search bar at the top of the board
- Tasks are filtered in real-time across all columns
- Search matches task titles

## Development

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [@dnd-kit](https://dndkit.com)
- [Zustand](https://github.com/pmndrs/zustand)
