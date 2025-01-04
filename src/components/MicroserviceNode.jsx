import React, { memo } from 'react';
import { Handle, useStore, Position } from '@xyflow/react';

export default memo(({ id }) => {
    const label = useStore((s) => {
        const node = s.nodeLookup.get(id);

        if (!node) {
            return null;
        }

        return node.data.label;


    });

    return (
        <div className="bg-blue-100 p-3 rounded border border-blue-500 shadow-md">
            <strong>{label}</strong>

            <Handle type="target" position={Position.Top} className="border-dotted bg-blue-500" />
            <Handle type="source" position={Position.Bottom} className="bg-blue-500" />


        </div>
    );
});