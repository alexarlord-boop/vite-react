import {create} from 'zustand';
import { persist } from 'zustand/middleware';

import {addEdge, applyNodeChanges, applyEdgeChanges, useReactFlow} from '@xyflow/react';
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
const useStore = create<AppState>()(
    persist(
        (set, get) => (
            {
                nodes: [],
                edges: [],
                id: 0,
                type: null,

                getId: () => {
                    set({id:  get().id + 1});
                    return `dndnode_` + get().id;
                },

                getType: () => {
                    return get().type;
                },

                setNodes: (nodes) => {
                    set({nodes});
                },

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

                onDragStart: (event, nodeType) => {
                    console.log('onDragStart', nodeType);
                    event.dataTransfer.effectAllowed = 'move';
                    if (nodeType != null) { set({type: nodeType}); }
                },

                onNodeClick: (event, node) => {
                    console.log('onNodeClick', event);
                    set({clickedNode: node});
                },



                onDragOver: (event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    console.log('onDragOver', event);
                },

                onDrop: (event, position) => {
                    event.preventDefault();
                    const type = get().type;
                    const id = get().getId();
                    const newNode: AppNode = {
                        id,
                        type,
                        position,
                        data: { label: `${type} node` },
                    };
                    set({ nodes: [...get().nodes, newNode] });
                    console.log('onDrop', newNode);
                }
            }
        ),
        {
            name: 'dnd-app',
        }
    )
)
export default useStore;