import {FileIcon} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button.tsx";


const NodeArtifactsPanel: React.FC<any> = ({ selectedNode, generateArtifacts }) => {
    const [artifactType, setArtifactType] = React.useState('Dockerfile');
    const isDockerfile = artifactType === 'Dockerfile';
    const isCompose = artifactType === 'Compose';
    const isKubernetes = artifactType === 'K8s';
    const handleArtifactTypeSelection = (type) => {
        setArtifactType(type);
    }


    if (!selectedNode) {
        return <div>Select a node to preview artifact</div>;
    }

    return (

        <div className=" rounded-md border p-4 bg-white">
            <div className="flex justify-between items-center align-middle">
                <p className="flex "><span className=""><FileIcon size="16"/></span> <strong> Artifacts</strong></p>
                <div className="flex gap-1">
                    <Button  size="sm" variant={isDockerfile ? "default" : "outline"} onClick={() => {handleArtifactTypeSelection("Dockerfile")}}>Dockerfile</Button>
                    <Button  size="sm" variant={isCompose ? "default" : "outline"} onClick={() => {handleArtifactTypeSelection("Compose")}}>sub-Compose</Button>
                    <Button className={isKubernetes ? "bg-blue-500 hover:bg-blue-500 " : 'hover:bg-blue-500 hover:text-white'} size="sm" variant={isKubernetes ? "default" : "outline"} onClick={() => {handleArtifactTypeSelection("K8s")}}>K8s</Button>
                </div>
            </div>

            {
                generateArtifacts().map((artifact, index) => {
                    if (artifact.id === selectedNode.id) {
                        return (
                            <div key={index} className="mb-4">
                                <h4 className="text-sm font-medium">{artifact.name}</h4>
                                <pre
                                    className={`p-2 ${selectedNode.data.color} rounded-md`}>{artifact.content}</pre>
                            </div>
                        )
                    }
                })
            }

        </div>
    )
}

export default NodeArtifactsPanel;

