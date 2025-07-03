// src/components/ControlPanel.jsx
import { FaPlus, FaSitemap, FaTrash } from 'react-icons/fa';
import './ControlPanel.css';

function ControlPanel({ onAddNode, onAutoLayout, onDeleteSelected }) {
  return (
    <div className="control-panel">
      <button onClick={onAddNode}>
        <FaPlus /> Add Node
      </button>
      <button onClick={onAutoLayout}>
        <FaSitemap /> Auto Layout
      </button>
      <button onClick={onDeleteSelected}>
        <FaTrash /> Delete Selected
      </button>
    </div>
  );
}

export default ControlPanel;