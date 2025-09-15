"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  NodeProps,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@repo/ui/button";

// Custom node components
const FormTriggerNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <div className="flex">
        <div className="rounded-full w-3 h-3 bg-green-500 mr-2"></div>
        <div className="font-bold">Form Trigger</div>
      </div>
      <div className="text-xs mt-1">Triggers on form submission</div>
    </div>
  );
};

const TelegramNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <div className="flex">
        <div className="rounded-full w-3 h-3 bg-blue-500 mr-2"></div>
        <div className="font-bold">Telegram</div>
      </div>
      <div className="text-xs mt-1">Sends message to Telegram</div>
    </div>
  );
};

const ResendNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500">
      <div className="flex">
        <div className="rounded-full w-3 h-3 bg-purple-500 mr-2"></div>
        <div className="font-bold">Resend</div>
      </div>
      <div className="text-xs mt-1">Sends emails via Resend</div>
    </div>
  );
};

const nodeTypes = {
  formTrigger: FormTriggerNode,
  telegram: TelegramNode,
  resend: ResendNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "formTrigger",
    position: { x: 0, y: 0 },
    data: { label: "Form Trigger" },
  },
];

const initialEdges: Edge[] = [];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState("");
  const [selectedNodeType, setSelectedNodeType] = useState("formTrigger");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    if (!nodeName.trim()) return;

    const newNode = {
      id: `${nodes.length + 1}`,
      type: selectedNodeType,
      position: { 
        x: Math.random() * 300, 
        y: Math.random() * 300 
      },
      data: { label: nodeName },
    };

    setNodes((nds) => nds.concat(newNode));
    setNodeName("");
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (typeof type === "undefined" || !type) return;

    const position = { x: 0, y: 0 };
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for adding nodes */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Nodes</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Node Name</label>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter node name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Node Type</label>
          <select
            value={selectedNodeType}
            onChange={(e) => setSelectedNodeType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="formTrigger">Form Trigger</option>
            <option value="telegram">Telegram</option>
            <option value="resend">Resend</option>
          </select>
        </div>
        
        <Button onClick={addNode} className="w-full mb-6">
          Add Node
        </Button>
        
        <div className="space-y-2">
          <div
            className="p-3 bg-green-100 rounded cursor-move border border-green-300"
            onDragStart={(event) => onDragStart(event, "formTrigger")}
            draggable
          >
            <div className="font-medium">Form Trigger</div>
            <div className="text-xs text-gray-600">Triggers on form submission</div>
          </div>
          
          <div
            className="p-3 bg-blue-100 rounded cursor-move border border-blue-300"
            onDragStart={(event) => onDragStart(event, "telegram")}
            draggable
          >
            <div className="font-medium">Telegram</div>
            <div className="text-xs text-gray-600">Sends message to Telegram</div>
          </div>
          
          <div
            className="p-3 bg-purple-100 rounded cursor-move border border-purple-300"
            onDragStart={(event) => onDragStart(event, "resend")}
            draggable
          >
            <div className="font-medium">Resend</div>
            <div className="text-xs text-gray-600">Sends emails via Resend</div>
          </div>
        </div>
      </div>
      
      {/* Workflow editor */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}