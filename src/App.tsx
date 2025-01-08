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
import {
    BedDoubleIcon,
    BedSingleIcon, CircleDotIcon,
    CogIcon,
    DatabaseIcon, EllipsisIcon,
    FileIcon, GripIcon,
    PencilIcon,
    SaveIcon, ServerCogIcon,
    ServerIcon,
    SmartphoneIcon,
    TargetIcon
} from "lucide-react";

import useStore from './hooks/store.ts';
import {useShallow} from "zustand/react/shallow";
import SideMenuWithPanels from "@/components/SideMenu.tsx";
import {NODE_TYPES} from "@/components/NodeComponent.jsx";
import NodeArtifactsPanel from "@/components/NodeArtifactsPanel.tsx";

const selector = (state) => ({
    selectedNode: state.selectedNode,
    setType: state.setType,
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
    generateArtifacts: state.generateArtifacts,
});


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const {screenToFlowPosition} = useReactFlow();

    const [getArtifactsIsClicked, setGetArtifactsIsClicked] = useState(false);

    const {
        selectedNode,
        setType,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onNodeClick,
        onDragStart,
        onDragOver,
        onDrop,
        onNodesDelete,
        generateArtifacts,
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
                    <Panel position="bottom-right">Nodes: {nodes.length} Edges: {edges.length} Selected: {selectedNode?.data.label}</Panel>
                    <Panel position="top-left">
                       <div className="">
                           {/*BASIC NODES*/}
                           <ScrollArea className="rounded-md border p-4 bg-white max-w-[100px]">
                               <h4 className="sticky top-0 py-1 mb-4 text-sm font-medium bg-white">Nodes</h4>
                               <Button
                                   aria-label="Frontend"
                                   key="frontend"
                                   onDragStart={(event) => onDragStart(event, "frontend")}
                                   draggable
                                   className="cursor-pointer p-2 mb-2 w-full"
                               >
                                   <SmartphoneIcon/>
                               </Button>

                               <Button className="cursor-pointer p-2 mb-2 w-full"
                                       onDragStart={(event) => onDragStart(event, 'backend')} draggable>
                                   <CogIcon/>
                               </Button>

                               <Button className="cursor-pointer p-2 mb-2 w-full"
                                       onDragStart={(event) => onDragStart(event, 'db')} draggable>
                                   <DatabaseIcon/>
                               </Button>

                               <Button className="cursor-pointer p-2 mb-2 w-full"
                                       onDragStart={(event) => onDragStart(event, 'ms')} draggable>
                                   <ServerIcon/>
                               </Button>


                           </ScrollArea>

                           {/*TEMPLATES*/}
                           <ScrollArea className=" rounded-md border p-4 bg-white max-w-[100px]">
                               <h4 className="sticky top-0 py-1 mb-4 text-sm font-medium bg-white">Models</h4>
                               <Button
                                   key="frontend"
                                   // onDragStart={(event) => onDragStart(event, "monolith")}
                                   draggable
                                   className="cursor-pointer p-2 mb-2 w-full"
                               >
                                   <CircleDotIcon/>
                               </Button>

                               <Button
                                   className="cursor-pointer p-2 mb-2 w-full"
                                   // onDragStart={(event) => onDragStart(event, '3-tier')}
                                   draggable>

                                   <EllipsisIcon/>
                               </Button>

                               <Button
                                   className="cursor-pointer p-2 mb-2 w-full"

                                   onDragStart={(event) => onDragStart(event, 'microservices')}
                                   draggable
                               >
                                   <GripIcon/>
                               </Button>

                               <Button
                                   className="cursor-pointer p-2 mb-2 w-full"
                                   onDragStart={(event) => onDragStart(event, 'ms')}
                                   draggable
                               >
                                   ƛ
                               </Button>



                           </ScrollArea>
                       </div>

                        {/*KUBERNETES*/}
                        {/*<ScrollArea className="rounded-md border p-4 bg-white max-w-[200px]">*/}
                        {/*    <h4 className="sticky top-0 py-1 mb-4 text-sm font-medium bg-white">Kubernetes (K8s)</h4>*/}
                        {/*    <Button*/}
                        {/*        key="frontend"*/}
                        {/*        // onDragStart={(event) => onDragStart(event, "monolith")}*/}
                        {/*        draggable*/}
                        {/*        className="cursor-pointer p-2 mb-2 w-full"*/}
                        {/*    >*/}
                        {/*        Ingress*/}
                        {/*    </Button>*/}

                        {/*    <Button*/}
                        {/*        className="cursor-pointer p-2 mb-2 w-full"*/}
                        {/*        // onDragStart={(event) => onDragStart(event, '3-tier')}*/}
                        {/*        draggable>*/}

                        {/*        Persistent Storage*/}
                        {/*    </Button>*/}

                        {/*    <Button*/}
                        {/*        className="cursor-pointer p-2 mb-2 w-full"*/}

                        {/*        onDragStart={(event) => onDragStart(event, 'microservices')}*/}
                        {/*        draggable*/}
                        {/*    >*/}
                        {/*        ConfigMap*/}
                        {/*    </Button>*/}

                        {/*    <Button*/}
                        {/*        className="cursor-pointer p-2 mb-2 w-full"*/}
                        {/*        onDragStart={(event) => onDragStart(event, 'ms')}*/}
                        {/*        draggable*/}
                        {/*    >*/}
                        {/*        Secret*/}
                        {/*    </Button>*/}


                        {/*</ScrollArea>*/}

                    </Panel>


                    <Panel position="top-right" className="flex-col flex gap-2 w-[400px]">

                        <div>
                            <Button onClick={
                                () => {
                                    console.log('nodes', nodes);
                                    console.log('edges', edges);

                                }}>
                                <SaveIcon/>
                                Save
                            </Button>
                        </div>
                        <NodeArtifactsPanel selectedNode={selectedNode} generateArtifacts={generateArtifacts}/>
                        <NodePropertiesPanel selectedNode={selectedNode} onUpdate={updateNode}/>


                    </Panel>

                    {/*<Panel position="top-left">*/}
                    {/*    <SideMenuWithPanels setType={setType} onDragStart={onDragStart}/>*/}
                    {/*</Panel>*/}


                    {/*<MiniMap/>*/}
                </ReactFlow>
            </div>
        </div>

    )
        ;
};

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <DnDFlow/>
        </DnDProvider>
    </ReactFlowProvider>
);

// TODO:- make sample artifacts generation (preview) -- Dockerfiles, compose...

// TODO:- saving to local FS with directories

// TODO:- clear the code
// TODO:- add templates