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
        <div className="bg-red-100 p-3 rounded border border-red-500 shadow-md">
            <strong>{label}</strong>

            <Handle type="source" position={Position.Bottom} className="bg-red-500" />
            {/*<Handle type="target" position={Position.Left} className="bg-blue-500" />*/}
        </div>
    );
});