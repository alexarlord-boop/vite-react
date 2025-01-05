import React, {useEffect, useRef} from 'react';

const PropertiesPanel: React.FC<any> = ({ selectedNode, onUpdate }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    if (!selectedNode) {
        return <div>Select a node to edit properties</div>;
    }

    const handleChange = (key: string, value: string) => {
        console.log(value);
        onUpdate(key, value);
    };



    return (
        <div className=" w-[250px] rounded-md border p-4 bg-white">
            <p><strong>Edit Node</strong></p>
            <label>
                Label:
                <input
                    ref={inputRef}
                    type="text"
                    value={selectedNode.data.label || ''}
                    onChange={(e) => handleChange('label', e.target.value)}
                />
            </label>
        </div>
    );
};

export default PropertiesPanel;
