import React, { useId } from 'react';
import { useStoryStore } from '../stores/story';
import { Draggable } from './Draggable';
import classNames from 'classnames';
import { Droppable } from './Droppable';
import { ScrollToBottom } from './ScrollToBottom';
import { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  useReactFlow,
  useStoreApi,
  Position,
  Handle,
} from 'reactflow';

import 'reactflow/dist/style.css';

import userIntentSvg from '../assets/user_intent.svg';
import assistantActionSvg from '../assets/assistant_action.svg';


import customNodeSvg from '../assets/custom_node.svg';
import { ChatBubbleOvalLeftIcon as Balloon } from '@heroicons/react/24/outline';

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
    draggable: false,
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
  {
    id: 'node-1',
    type: 'step',
    position: { x: 0, y: 0 },
    data: { title: 'greet', type: 'action' },
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const CustomNode = () => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text</label>
        <input id="text" name="text" onChange={onChange} />
        <img src={customNodeSvg} alt="customnode" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 10 }}
      />
    </>
  );
};

const StepNode = ({ data }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="relative w-24">
        <label htmlFor="text">{data.title} </label>
        <Balloon className="absolute -inset-12 text-blue-500" />
        {/* <img src={balloon} className='h-24 absolute' /> */}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 10 }}
      />
    </>
  );
};

const nodeTypes = { customNode: CustomNode, step: StepNode };

const Diagram = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView={true}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const StepItem: React.FC<{
  index: number;
  name: string;
  type: 'INTENT' | 'ACTION';
}> = ({ index, name, type }) => {
  const id = useId();

  const getImageSrc = (type: any) => {
    const map: any = {
      INTENT: userIntentSvg,
      ACTION: assistantActionSvg,
    };
    return map[type];
  };

  return (
    <Draggable id={`${index}-${id}`} data={{ name, type }}>
      <div className="relative flex justify-center">
        <img src={getImageSrc(type)} alt="step" />
        <p className="absolute h-full flex flex-col justify-center text-2xl font">{name}</p>
      </div>
    </Draggable>
  );
};

export const StoryView = () => {
  const { steps } = useStoryStore();

  // return <Diagram />;
  return (
    <Droppable id="story-container">
      {steps.map((step, index) => {
        return <StepItem key={`step-${index}}`} {...step} index={index} />;
      })}
      <ScrollToBottom />
    </Droppable>
  );
};
