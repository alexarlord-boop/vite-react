export const templates = {
    simpleArchitecture: {
        name: 'Simple Architecture',
        nodes: [
            { id: '1', type: 'input', data: { label: 'Frontend' }, position: { x: 250, y: 0 } },
            { id: '2', data: { label: 'Backend' }, position: { x: 100, y: 150 } },
            { id: '3', type: 'output', data: { label: 'Database' }, position: { x: 400, y: 150 } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', label: 'HTTP' },
            { id: 'e2-3', source: '2', target: '3', label: 'SQL' },
        ],
    },
    microservices: {
        name: 'Microservices Architecture',
        nodes: [
            { id: '1', data: { label: 'API Gateway' }, position: { x: 200, y: 0 } },
            { id: '2', data: { label: 'Service A' }, position: { x: 100, y: 150 } },
            { id: '3', data: { label: 'Service B' }, position: { x: 300, y: 150 } },
            { id: '4', data: { label: 'Database' }, position: { x: 200, y: 300 } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', label: 'HTTP' },
            { id: 'e1-3', source: '1', target: '3', label: 'HTTP' },
            { id: 'e2-4', source: '2', target: '4', label: 'SQL' },
            { id: 'e3-4', source: '3', target: '4', label: 'SQL' },
        ],
    },
};
