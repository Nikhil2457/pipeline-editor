import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ControlPanel from './components/ControlPanel';
import CustomNode from './components/CustomNode';
import ValidationMessage from './components/ValidationMessage';
import { validateDAG } from './services/dagValidation';
import { applyAutoLayout } from './services/autoLayout';
import './App.css';

const nodeTypes = { custom: CustomNode };

const initialNodes = [];
const initialEdges = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [validationStatus, setValidationStatus] = useState({ isValid: false, message: '' });
  const { fitView } = useReactFlow();

  // Validate DAG whenever nodes or edges change
  useEffect(() => {
    const { isValid, message } = validateDAG(nodes, edges);
    setValidationStatus({ isValid, message });
  }, [nodes, edges]);

  // Handle adding a new node
  const addNode = useCallback(() => {
    const label = prompt('Enter node label:');
    if (!label) return;

    const newNode = {
      id: `${+new Date()}`,
      type: 'custom',
      data: { label },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  // Handle edge creation
  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) {
        alert('Self-connections are not allowed!');
        return;
      }
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges]
  );

  // Handle delete key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Key pressed:', event.key);
      if (event.key === 'Delete') {
        const selectedNodes = nodes.filter((node) => node.selected);
        console.log('Selected nodes:', selectedNodes); // Debug
        const selectedNodeIds = new Set(selectedNodes.map((node) => node.id));
        const selectedEdges = edges.filter((edge) => edge.selected);
        console.log('Selected edges:', selectedEdges); // Debug

        setNodes((nds) => nds.filter((node) => !selectedNodeIds.has(node.id)));
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !edge.selected &&
              !selectedNodeIds.has(edge.source) &&
              !selectedNodeIds.has(edge.target)
          )
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges]);

  // Handle auto-layout
  const handleAutoLayout = useCallback(() => {
    const { newNodes, newEdges } = applyAutoLayout(nodes, edges);
    setNodes(newNodes);
    setEdges(newEdges);
    setTimeout(() => fitView({ duration: 500 }), 100);
  }, [nodes, edges, fitView]);

  // Handle delete selected button
  const onDeleteSelected = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);
    console.log('Selected nodes (button):', selectedNodes); // Debug
    const selectedNodeIds = new Set(selectedNodes.map((node) => node.id));
    const selectedEdges = edges.filter((edge) => edge.selected);
    console.log('Selected edges (button):', selectedEdges); // Debug

    setNodes((nds) => nds.filter((node) => !selectedNodeIds.has(node.id)));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          !edge.selected &&
          !selectedNodeIds.has(edge.source) &&
          !selectedNodeIds.has(edge.target)
      )
    );
  }, [nodes, edges]);

  return (
    <div className="app-container">
      <ControlPanel onAddNode={addNode} onAutoLayout={handleAutoLayout} onDeleteSelected={onDeleteSelected} />
      <ValidationMessage status={validationStatus} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable
        nodesConnectable
        elementsSelectable // Explicitly enable selection
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="json-preview">
        <h3>Graph JSON</h3>
        <pre>{JSON.stringify({ nodes, edges }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}