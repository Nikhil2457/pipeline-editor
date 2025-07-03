# Pipeline Editor

A React-based Directed Acyclic Graph (DAG) editor with real-time validation, auto-layout, and a modern UI. Built with Vite and ReactFlow.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd pipeline-editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🛠️ Libraries Used & Key Architectural Decisions

- **[React](https://react.dev/):** UI framework for building the component-based interface.
- **[Vite](https://vitejs.dev/):** Fast build tool and dev server for modern web projects.
- **[ReactFlow](https://reactflow.dev/):** Handles graph rendering, node/edge management, and user interactions.
- **[dagre](https://github.com/dagrejs/dagre):** Used for automatic DAG layout (left-to-right arrangement).
- **[react-icons](https://react-icons.github.io/react-icons/):** Provides modern icons for UI buttons.

**Architecture Notes:**
- The app is wrapped in `ReactFlowProvider` for context management.
- Nodes and edges are managed in React state (`useState`).
- Custom node components allow for flexible handle placement and styling.
- Real-time DAG validation is performed on every change to nodes/edges.
- Auto-layout is implemented as a service and triggered via the UI.
- The UI provides immediate feedback on DAG validity and a JSON preview for debugging.

---

## ⚡ Features

- **Add Node:** Prompt for label, random initial position, unique ID.
- **Draw Edges:** Drag from source to target handles; self-connections prevented.
- **Delete Nodes/Edges:** Select and press Delete key or use the Delete button; cascade deletes edges connected to removed nodes.
- **DAG Validation:** Checks for at least 2 nodes, no cycles, and all nodes connected.
- **Auto Layout:** Arranges nodes left-to-right using dagre.
- **UX Enhancements:** Modern icons, JSON preview, and real-time validation feedback.

---

## 🧩 Challenges & Solutions

### 1. **Ensuring DAG Validity**
- **Challenge:** Preventing cycles and ensuring all nodes are connected in real-time as the user edits the graph.
- **Solution:** Implemented a custom validation service using DFS for cycle detection and set logic for connectivity. Validation runs on every change and provides instant feedback.

### 2. **Cascade Deletion of Edges**
- **Challenge:** When deleting nodes, all connected edges must also be removed to avoid orphaned edges.
- **Solution:** On node deletion, edges are filtered to remove any that reference deleted node IDs (as source or target).

### 3. **Auto Layout Integration**
- **Challenge:** Integrating dagre layout with ReactFlow and ensuring smooth transitions.
- **Solution:** Used dagre to compute new positions, then updated node state and called `fitView` for a smooth user experience.

### 4. **User Experience**
- **Challenge:** Providing clear feedback for invalid actions (e.g., self-connections, invalid DAGs).
- **Solution:** Added alerts for invalid actions and a persistent validation message component for DAG status.

### 5. **Debugging and Transparency**
- **Challenge:** Users and developers need to see the underlying graph data for debugging.
- **Solution:** Added a JSON preview panel that updates in real-time with the graph state.

---

## 📁 Project Structure

- `src/App.jsx` — Main app logic, state management, and ReactFlow integration.
- `src/components/` — UI components (ControlPanel, CustomNode, ValidationMessage).
- `src/services/` — DAG validation and auto-layout logic.

---

## 🙏 Acknowledgements
- [ReactFlow](https://reactflow.dev/)
- [dagre](https://github.com/dagrejs/dagre)
- [Vite](https://vitejs.dev/)
- [react-icons](https://react-icons.github.io/react-icons/)
