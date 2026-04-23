# TaskFlow - Collaborative Task Management SaaS

A modern, fast, and intuitive task management application built with React and Vite. Perfect for teams and individuals managing projects with Kanban-style boards.

## Features

✨ **Kanban Boards** - Visual task management with columns
✏️ **Drag & Drop** - Smooth task organization
🎯 **Priority Levels** - Low, Medium, High priority tracking
📱 **Responsive Design** - Works on desktop and mobile
🌙 **Dark Theme** - Easy on the eyes
⚡ **Real-time Sync** - Instant updates across the app
👥 **Collaborative** - Share boards with your team

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5174` to get started.

## Project Structure

```
taskflow/
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── TaskCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── store/
│   │   └── taskStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## Features to Implement

- [ ] Drag and drop between columns
- [ ] Task details modal with description, attachments
- [ ] Assigned users with avatars
- [ ] Due dates with calendar picker
- [ ] Task comments and activity log
- [ ] Board templates
- [ ] Export to CSV/PDF
- [ ] Integration with Slack/GitHub

## License

MIT
