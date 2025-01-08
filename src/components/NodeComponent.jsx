import React, {memo} from 'react';
import {Handle, Position, useStore} from '@xyflow/react';
import {CogIcon, Database, DatabaseIcon, PhoneIcon, ServerIcon, SmartphoneIcon} from "lucide-react";

// Define node types and their metadata
export const NODE_TYPES = {
    frontend: {
        label: "Frontend",
        color: "bg-red-100",
        borderColor: "border-red-500",
    },
    backend: {
        label: "Backend",
        color: "bg-yellow-100",
        borderColor: "border-yellow-500",


    },
    db: {
        label: "Database",
        color: "bg-green-100",
        borderColor: "border-green-500",

    },
    ms: {
        label: "Microservice",
        color: "bg-purple-100",
        borderColor: "border-purple-500",

    },
};

const NodeComponent = memo(({id, data}) => {
    const {type, ...rest} = data; // Extract node data
    const nodeStyle = NODE_TYPES[type] || {}; // Get styles based on node type

    const label = useStore((s) => {
        const node = s.nodeLookup.get(id);

        if (!node) {
            return null;
        }

        return node.data.label;

    });

    const icon = (type) => {
        switch (type) {
            case 'frontend':
                return <SmartphoneIcon/>
            case 'backend':
                return <CogIcon/>
            case 'db':
                return <DatabaseIcon/>
            case 'ms':
                return <ServerIcon/>
        }
    }

    const handles = (type) => {
        switch (type) {
            case 'frontend':
                return <Handle type="source" position={Position.Bottom} className="bg-red-500"/>
            case 'backend':
                // i need 2 handles on same level without <>
                return <>
                    <Handle type="target" position={Position.Top} className="border-dotted bg-yellow-500"/>
                    <Handle type="source" position={Position.Bottom} className="bg-yellow-500"/>
                </>
            case 'db':
                return <Handle type="target" position={Position.Top} className="border-dotted bg-green-500"/>
            case 'ms':
                return <>
                    <Handle type="target" position={Position.Top} className="border-dotted bg-purple-500"/>
                    <Handle type="source" position={Position.Bottom} className="bg-purple-500"/>
                </>

        }
    }


    return (
        <div
            className={`p-3 rounded border shadow-md ${nodeStyle.color || 'bg-gray-100'} ${
                nodeStyle.borderColor || 'border-gray-500'
            } ${nodeStyle.shadowColor || 'shadow-gray-500'}`}
        >
            {icon(type)}
            <strong>{label }</strong>
            {/* Additional data */}
            {rest.description && <p className="text-sm text-gray-700">{rest.description}</p>}
            {handles(type)}
        </div>
    );
});

export default NodeComponent;
