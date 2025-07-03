// src/services/autoLayout.js
import dagre from 'dagre';

export function applyAutoLayout(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: 'LR' });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Add nodes to dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });

  // Add edges to dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run layout
  dagre.layout(dagreGraph);

  // Update node positions
  const newNodes = nodes.map((node) => ({
    ...node,
    position: {
      x: dagreGraph.node(node.id).x - 75, // Adjust for node width
      y: dagreGraph.node(node.id).y - 25, // Adjust for node height
    },
  }));

  return { newNodes, newEdges: edges };
}