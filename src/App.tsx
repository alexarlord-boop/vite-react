import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background, Panel, SmoothStepEdge, StraightEdge, MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {ScrollArea} from "@/components/ui/scroll-area"
// @ts-ignore
import FrontendNode from "@/components/FrontendNode.jsx";
import BackendNode from "@/components/BackendNode.jsx";
import DatabaseNode from "@/components/DatabaseNode.jsx";
import MicroserviceNode from "@/components/MicroserviceNode.jsx";
import {DnDProvider, useDnD} from './DnDContext.jsx';
import NodePropertiesPanel from "@/components/NodePropertiesPanel.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SaveIcon, TargetIcon} from "lucide-react";

import useStore from './hooks/store.ts';


let id = 0;
const getId = () => `dndnode_${id++}`;


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {screenToFlowPosition} = useReactFlow();
    const [type, setType] = useDnD();


    // updating node props
    const [nodeName, setNodeName] = useState('');

    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeClick = (event: any, node: any) => {
        setNodeName('');
        ;
        setSelectedNode(node);
        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                data: {
                    ...n.data,
                    selected: n.id === node.id,
                },
            }))
        );
    }


    // const nodeTypes = [
    //     {type: 'frontend', label: 'Frontend', color: '#FFD700'},
    //     {type: 'backend', label: 'Backend', color: '#FF4500'},
    //     {type: 'DB', label: 'Database', color: '#4169E1'},
    // ];

    const nodeTypes = {
        frontend: FrontendNode,
        backend: BackendNode,
        db: DatabaseNode,
        ms: MicroserviceNode,
    };

    const edgeTypes = {
        // default: StraightEdge,
    }


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {label: `${type}`},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );


    // updating nodes effect
    useEffect(() => {
        // @ts-ignore
        setNodes((nds) =>
            nds.map((node) => {
                // @ts-ignore
                if (selectedNode) {

                    if (node.id === selectedNode.id) {
                        // it's important that you create a new node object
                        // in order to notify react flow about the change
                        // @ts-ignore
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                label: nodeName || node.data.label,
                            },
                            style: {border: '1px  dashed black'}, // Highlight the selected node

                        };
                    }
                }
                return {
                    ...node,
                    style: {border: 'none'}, // Remove highlight from other nodes
                };
            }),
        );

        // @ts-ignore
        setEdges((eds) =>
            eds.map((edge) => {
                if (edge.source === selectedNode?.id || edge.target === selectedNode?.id) {
                    return {
                        ...edge,
                        style: {stroke: 'blue', strokeWidth: 1, strokeDasharray: '5,5'}, // Highlight the related edges
                    };
                }
                return {
                    ...edge,
                    style: {stroke: 'black', strokeWidth: 1}, // Default style for other edges
                };
            })
        );

    }, [nodeName, selectedNode, setNodes]);

    const updateNode = (key: string, value: string) => {
        console.log(key, value);
        setNodeName(value);
        selectedNode.data.label = value;
    };

    const onNodesDelete = (nds) => {
        console.log('delete', nds);
        setSelectedNode(null);
    }


    return (
        <div className="dndflow">
            <div style={{height: '100vh', width: '100vw'}} className="" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    onNodesDelete={onNodesDelete}
                    fitView
                    style={{backgroundColor: "#F7F9FB"}}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                >
                    <Controls/>
                    <Background/>
                    <Panel
                        position="bottom-right">Nodes: {nodes.length} Edges: {edges.length} Selected: {selectedNode?.data.label}</Panel>
                    <Panel position="top-left">
                        <ScrollArea className="w-[160px] rounded-md border p-4 bg-white">
                            <h4 className="sticky top-0 py-1 mb-4 text-sm font-medium bg-white">Nodes</h4>
                            <Button
                                key="frontend"
                                onDragStart={(event) => onDragStart(event, "frontend")}
                                draggable
                                className="cursor-pointer p-2 mb-2 w-full"
                            >
                                Frontend
                            </Button>

                            <Button className="cursor-pointer p-2 mb-2 w-full"
                                    onDragStart={(event) => onDragStart(event, 'backend')} draggable>
                                Backend
                            </Button>

                            <Button className="cursor-pointer p-2 mb-2 w-full"
                                    onDragStart={(event) => onDragStart(event, 'db')} draggable>
                                Database
                            </Button>

                            <Button className="cursor-pointer p-2 mb-2 w-full"
                                    onDragStart={(event) => onDragStart(event, 'ms')} draggable>
                                Microservice
                            </Button>


                        </ScrollArea>

                        <ScrollArea className="w-[160px] rounded-md border p-4 bg-white">
                            <h4 className="sticky top-0 py-1 mb-4 text-sm font-medium bg-white">Templates</h4>
                            <Button
                                key="frontend"
                                // onDragStart={(event) => onDragStart(event, "monolith")}
                                draggable
                                className="cursor-pointer p-2 mb-2 w-full"
                            >
                                Monolith
                            </Button>

                            <Button
                                className="cursor-pointer p-2 mb-2 w-full"
                                // onDragStart={(event) => onDragStart(event, '3-tier')}
                                draggable>

                                3-Tier
                            </Button>

                            <Button
                                className="cursor-pointer p-2 mb-2 w-full"

                                onDragStart={(event) => onDragStart(event, 'microservices')}
                                draggable
                            >
                                Microservices
                            </Button>

                            <Button
                                className="cursor-pointer p-2 mb-2 w-full"
                                onDragStart={(event) => onDragStart(event, 'ms')}
                                draggable
                            >
                                Serverless
                            </Button>


                        </ScrollArea>

                    </Panel>


                    <Panel position="top-right">
                        {/*    <div className="h-[300px] w-[250px] rounded-md border p-4 bg-white">*/}
                        {/*        <p>Node settings</p>*/}
                        {/*        {selectedNode && (*/}
                        {/*            <>*/}
                        {/*                <p><strong>Type:</strong> {selectedNode.type}</p>*/}
                        {/*                <p><strong>Label:</strong> {selectedNode.data.label}</p>*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*    </div>*/}

                        <NodePropertiesPanel selectedNode={selectedNode} onUpdate={
                            updateNode
                        }/>

                    </Panel>

                    <Panel position="top-center" className="flex gap-2">
                        <Button onClick={
                            () => {
                                console.log('nodes', nodes);
                                console.log('edges', edges);
                            }
                        }>
                            <SaveIcon/>
                            Save</Button>
                        <Button><TargetIcon/> Get Artifacts</Button>
                    </Panel>
                    {/*<MiniMap/>*/}
                </ReactFlow>
            </div>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <DnDFlow/>
        </DnDProvider>
    </ReactFlowProvider>
);

// TODO:- make diagram saveable and reproducable (zustand state)
// TODO:- make nodes with editable props -- more props
// TODO:- make sample artifacts generation (preview)
// TODO:- clear the code
// TODO:- add templates