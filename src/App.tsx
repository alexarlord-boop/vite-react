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
import NodeComponent from "@/components/NodeComponent.jsx";
import FrontendNode from "@/components/FrontendNode.jsx";
import BackendNode from "@/components/BackendNode.jsx";
import DatabaseNode from "@/components/DatabaseNode.jsx";
import MicroserviceNode from "@/components/MicroserviceNode.jsx";
import {DnDProvider, useDnD} from './DnDContext.jsx';
import NodePropertiesPanel from "@/components/NodePropertiesPanel.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SaveIcon, TargetIcon} from "lucide-react";

import useStore from './hooks/store.ts';
import {useShallow} from "zustand/react/shallow";


const selector = (state) => ({
    selectedNode: state.selectedNode,
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onNodeClick: state.onNodeClick,
    onDrop: state.onDrop,
    onDragStart: state.onDragStart,
    onDragOver: state.onDragOver,
    onNodesDelete: state.onNodesDelete,
});


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const {screenToFlowPosition} = useReactFlow();

    const {
        selectedNode,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onNodeClick,
        onDragStart,
        onDragOver,
        onDrop,
        onNodesDelete
    } = useStore(
        useShallow(selector),
    );

    const nodeTypes = {
        frontend: NodeComponent,
        backend: NodeComponent,
        db: NodeComponent,
        ms: NodeComponent,
    };

    const updateNode = (key: string, value: string) => {
        selectedNode.data[key] = value;
        onNodesChange([{...selectedNode}]);
    };


    const handleDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = screenToFlowPosition({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        onDrop(event, position);
    };

    return (
        <div className="dndflow">
            <div style={{height: '100vh', width: '100vw'}} className="" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={handleDrop}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    onNodesDelete={onNodesDelete}
                    fitView
                    style={{backgroundColor: "#F7F9FB"}}
                    nodeTypes={nodeTypes}
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

// TODO:- make sample artifacts generation (preview)
// TODO:- clear the code
// TODO:- add templates