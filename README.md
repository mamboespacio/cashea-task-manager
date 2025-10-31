# cashea-task-manager

## Tech Stack

- **Expo SDK**: 52  
- **React Native**: 0.76  
- **Tailwind CSS**: via Nativewind
- **State Management**: Zustand  
- **API Mock**: JSON Server  
- **Navigation**: Expo Router  

## About

Zustand was used for simplicity, performance, and low boilerplate.
It allows managing the global state of tasks and the UI (filters, modals, dark mode) without the need for reducers or nested contexts.

- Dark mode uses 'dark' class on the root level through Zustand
- Tailwind configured with nativewind and darkMode: 'class'
- No auth for code simplicity
= JSON server only persist locally
- Advanced network error missing

## Setup & Installation

### 1 Clone Repo

```bash
git clone https://github.com/tu-usuario/task-manager-app.git
cd task-manager-app

### 2 Install dependencies
npm install

### 3 Init Json Server

npx json-server db.json --port 3001


By default API runs on http://localhost:3001/tasks.
For mobile devices replace with local IP

### 4 Run app

iOS:

npx expo run:ios


Android:

npx expo run:android

Expo client:

npx expo start

