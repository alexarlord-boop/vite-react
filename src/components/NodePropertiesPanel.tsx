import React, {useEffect, useRef} from 'react';
import {PencilIcon, PenIcon} from "lucide-react";

const PropertiesPanel: React.FC<any> = ({ selectedNode, onUpdate }) => {
    if (!selectedNode) {
        return <div>Select a node to edit properties</div>;
    }

    const handleChange = (key: string, value: string) => {
        console.log(value);
        onUpdate(key, value);
    };

    const handleNodeTypePanel = (type) => {
        switch (type) {
            case 'frontend':
                return (
                    <div className="mt-4 space-y-2">
                        <div>
                            <label className="block text-sm font-medium">Label</label>
                            <input
                                type="text"
                                value={selectedNode.data.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Port</label>
                            <input
                                type="number"
                                value={selectedNode.data.port}
                                onChange={(e) => handleChange('port', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Framework</label>
                            <select
                                value={selectedNode.data.framework}
                                onChange={(e) => handleChange('framework', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="React">React</option>
                                <option value="Vue">Vue</option>
                                <option value="Angular">Angular</option>
                                <option value="Node.js">Node.js</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Build Command</label>
                            <input
                                type="text"
                                value={selectedNode.data.buildCommand}
                                onChange={(e) => handleChange('buildCommand', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    </div>
                )

            case 'backend':
                return (
                    <div className="mt-4 space-y-2">
                        <div>
                            <label className="block text-sm font-medium">Label</label>
                            <input
                                type="text"
                                value={selectedNode.data.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Language</label>
                            <select
                                value={selectedNode.data.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="Python (Flask)">Python (Flask)</option>
                                <option value="Python (Django)">Python (Django)</option>
                                <option value="Java (Spring)">Java (Spring)</option>
                                <option value="Node.js">Node.js</option>
                            </select>

                        </div>
                        <div>
                            <label className="block text-sm font-medium">Port</label>
                            <input
                                type="number"
                                value={selectedNode.data.port}
                                onChange={(e) => handleChange('port', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Environment Variables</label>
                            <textarea
                                value={selectedNode.data.env_var}
                                onChange={(e) => handleChange('env_var', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Replicas</label>
                            <input
                                type="number"
                                value={selectedNode.data.replicas}
                                onChange={(e) => handleChange('replicas', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Endpoints</label>
                            <textarea
                                value={selectedNode.data.endpoints}
                                onChange={(e) => handleChange('endpoints', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                    </div>
                );

            case 'db':
                return (
                    <div className="mt-4 space-y-2">
                        <div>
                            <label className="block text-sm font-medium">Label</label>
                            <input
                                type="text"
                                value={selectedNode.data.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Type</label>
                            <select
                                value={selectedNode.data.db_type}
                                onChange={(e) => handleChange('db_type', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="PostgreSQL v14">PostgreSQL v14</option>
                                <option value="MySQL v8">MySQL v8</option>
                                <option value="MongoDB v5">MongoDB v5</option>
                                <option value="Redis v6">Redis v6</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Port</label>
                            <input
                                type="number"
                                value={selectedNode.data.port}
                                onChange={(e) => handleChange('port', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Host</label>
                            <input
                                type="text"
                                value={selectedNode.data.host}
                                onChange={(e) => handleChange('host', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Environment Variables</label>
                            <textarea
                                value={selectedNode.data.env_var}
                                onChange={(e) => handleChange('env_var', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <label className="block text-sm font-medium">Storage Volume</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        value={selectedNode.data.storage_volume}*/}
                        {/*        onChange={(e) => handleChange('storage_volume', e.target.value)}*/}
                        {/*        className="w-full border rounded px-2 py-1"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                );

        }
    }


    return (
        <div className=" rounded-md border p-4 bg-white">
            <p className="flex"> <span className="pe-2"><PencilIcon size="16"/></span> <strong> Edit Node</strong></p>
            {handleNodeTypePanel(selectedNode.data.type)}
        </div>
    );
};

export default PropertiesPanel;
