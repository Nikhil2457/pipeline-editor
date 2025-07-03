// src/components/CustomNode.js
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

function CustomNode({ data }) {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;