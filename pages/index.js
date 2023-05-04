import React, { useCallback, useEffect,useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import ResizableNode from '../components/ResizableNodes'; 
import 'reactflow/dist/style.css';
import firestoreDB from '../lib';
import {setDoc,getDoc,doc} from 'firebase/firestore';
import SaveButton from "../components/saveButton";
const initialNodes = [];
const initialEdges = [];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes=useMemo(
    () => ({
      ResizableNode: ResizableNode,
    }),
    []
  );
  // firebase doc ref
    

  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  useEffect(()=>{
    // get nodes and edges from local storage
    // read data from firebase
    const getData=async()=>{
      const docRef= doc(firestoreDB,  "canva-lite", "EvDSEkbUd7IymwhvuTTE");
      const docSnap=await getDoc(docRef);
      const data=docSnap.data();
      if(data){
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    }
    getData();
    return () => {
     setEdges(initialEdges);
     setNodes(initialNodes); 
    }
  },[])
  const handleDoubleClick=(e)=>{
 
  const mousePosition = {x:e.pageX, y:e.pageY};
  const newNode = {
    id: (nodes.length+1).toString(),
    type:'ResizableNode',
    position: { x: mousePosition.x, y: mousePosition.y },
    data: { label: (nodes.length+1).toString() },
  };
  const newEdge = {
    id: `e${nodes.length}-${nodes.length+1}`,
    source: nodes[nodes.length-1].id,
    
    target: newNode.id,
  };
  setNodes((ns) => [...ns, newNode]);
  setEdges((es) => [...es, newEdge]);
  }
  const handleSave=async()=>{
    // save nodes and edges to local storage 
    // save edges and node to firebase
    const docRef= doc(firestoreDB,  "canva-lite", "EvDSEkbUd7IymwhvuTTE");
    await setDoc(docRef,{
      nodes:nodes,
      edges:edges
    });
  }
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
     <SaveButton handleSave={handleSave} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} 
         nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        onDoubleClick={handleDoubleClick}
      >
        <Controls />
        <MiniMap />
    
        <Background  color="black" variant="dots" style={{backgroundColor:'#282929'}}  gap={12} size={1} />

      </ReactFlow>
    </div>
  );
}