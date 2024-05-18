
import { useState, useCallback,useMemo } from 'react';
import ReactFlow, {
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';


const getRandomId = () => Math.floor(100 + Math.random() * 900).toString();

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );


  const edgeTypes = {
    'custom-edge': CustomEdge,
  };

  const addNewNode = () => {
    const newNodeId = getRandomId();
    const newNode = {
      id: newNodeId,
      data: { label: 'New Node' },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      type: 'customNode',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const updateNodeLabel = (nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: newLabel,
          };
        }
        return node;
      })
    );
  };



  const nodeTypes = useMemo(
    () => ({
      customNode: (props) => <CustomNode {...props} onNodeUpdate={updateNodeLabel}  onDelete={deleteNode} />,
    }),
    [],
  );

  return (
    <>
    <div className="w-screen h-screen flex  bg-[#6B728E] overflow-hidden">
      <div className="p-4 bg-[#404258] text-white flex justify-start">
        <button 
          onClick={addNewNode} 
          className="bg-[#474E68] hover:bg-[#50577A] text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Create Node
        </button>
      </div>
      <div className="flex-1 h-full ml-5 mt-4 p-4 bg-[#6B728E] shadow-lg rounded-lg">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="line" color="#9AC8CD" gap={25} />
        </ReactFlow>
      </div>
    </div>
  </>
  

  );
}

export default App;