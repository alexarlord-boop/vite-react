import {create} from 'zustand';
import {persist} from 'zustand/middleware';

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


const defaultFrontend = {
    port: '3000',
    framework: 'React',
    buildCommand: 'npm run build',
};

const defaultBackend = {
    language: 'Python',
    port: '5000',
    env_var: ['PORT=5000'],
    replicas: 1,
    endpoints: [],
}

const defaultDb = {
    db_type: 'PostgreSQL v14',
    port: '5432',
    host: 'localhost',
    env_var: ['POSTGRES_USER=postgres', 'POSTGRES_PASSWORD=postgres', 'POSTGRES_DB=postgres'],
    storage_volume: '/var/lib/postgresql/data'
}


// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>()(
    persist(
        (set, get) => (
            {
                nodes: [],
                edges: [],
                id: 0,
                type: null,
                selectedNode: null,

                getId: () => {
                    set({id: get().id + 1});
                    return `dndnode_` + get().id;
                },

                getType: () => {
                    return get().type;
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
                    // console.log('onDragStart', nodeType);
                    event.dataTransfer.effectAllowed = 'move';
                    if (nodeType != null) {
                        set({type: nodeType});
                    }
                },

                onNodeClick: (event, node) => {
                    console.log('onNodeClick', node);
                    set({selectedNode: node});
                    set({
                        nodes: get().nodes.map((n) => {
                            if (n.id === node.id) {
                                return {
                                    ...n, style: {
                                        outline: '2px dashed black',
                                        borderRadius: '5px',

                                    }
                                };
                            } else {
                                return {...n, style: {}};
                            }
                        }),

                    })
                },

                onNodesDelete: (event, nodes) => {
                    set({selectedNode: null});
                },


                onDragOver: (event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                },

                onDrop: (event, position) => {
                    event.preventDefault();
                    const type = get().type;
                    const id = get().getId();
                    let defaults = null

                    switch (type) {
                        case 'frontend':
                            defaults = defaultFrontend;
                            break;
                        case 'backend':
                            defaults = defaultBackend;
                            break;
                        case 'db':
                            defaults = defaultDb;
                            break;
                        // case 'ms':
                        //     defaults = defaultMs;
                        //     break;
                    }


                    const newNode: AppNode = {
                        id,
                        type,
                        position,
                        data: {
                            type: type,
                            label: `${type[0].toUpperCase()}`,
                            ...defaults,
                        },
                    };
                    set({nodes: [...get().nodes, newNode]});
                }
            }
        ),
        {
            name: 'dnd-app',
        }
    )
)
export default useStore;