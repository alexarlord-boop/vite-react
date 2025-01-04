import {create} from 'zustand';
import {addEdge, applyNodeChanges, applyEdgeChanges} from '@xyflow/react';
import {
    type Edge,
    type Node,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
} from '@xyflow/react';

export type AppNode = Node;

export type AppState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
};

import {type AppState} from './types';
import {useCallback} from "react";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
    nodes: [],
    edges: [],
    id: 0,


    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes) => {
        set({nodes});
    },
    setEdges: (edges) => {
        set({edges});
    },

    onDrop: (event) => {
        event.preventDefault();
        // const position = screenToFlowPosition({
        //     x: event.clientX,
        //     y: event.clientY,
        // });
        // console.log('onDrop', event);

        function getId() {
            return `dndnode_${id++}`;
        }

        const newNode = {
                            id: getId(),
                            type,
                            position,
                            data: {label: `${type}`},
                        };

    },

    onDragOver: (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        console.log('onDragOver', event);
    }

    // const onDrop = useCallback(
    //     (event) => {
    //         event.preventDefault();
    //
    //         // check if the dropped element is valid
    //         if (!type) {
    //             return;
    //         }
    //
    //         // project was renamed to screenToFlowPosition
    //         // and you don't need to subtract the reactFlowBounds.left/top anymore
    //         // details: https://reactflow.dev/whats-new/2023-11-10
    //         const position = screenToFlowPosition({
    //             x: event.clientX,
    //             y: event.clientY,
    //         });
    //         const newNode = {
    //             id: getId(),
    //             type,
    //             position,
    //             data: {label: `${type}`},
    //         };
    //
    //         setNodes((nds) => nds.concat(newNode));
    //     },
    //     [screenToFlowPosition, type],
    // );
}));

export default useStore;