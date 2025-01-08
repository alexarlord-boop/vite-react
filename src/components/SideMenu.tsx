import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Panel} from '@xyflow/react';

const SideMenuWithPanels = ({setType, onDragStart}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);

    const togglePanel = (panelName: string) => {
        setActivePanel(activePanel === panelName ? null : panelName);
    };

    const handlenDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        // <div className="flex">
        //     {/* Sidebar with Icons */}
        //     <div className="flex flex-col items-center gap-4 p-4 bg-gray-100">
        //         <Button
        //             variant="outline"
        //             onClick={() => togglePanel("nodes")}
        //             className={activePanel === "nodes" ? "bg-gray-300" : ""}
        //         >
        //             🖥️
        //         </Button>
        //         <Button
        //             variant="outline"
        //             onClick={() => togglePanel("templates")}
        //             className={activePanel === "templates" ? "bg-gray-300" : ""}
        //         >
        //             📂
        //         </Button>
        //         <Button
        //             variant="outline"
        //             onClick={() => togglePanel("kubernetes")}
        //             className={activePanel === "kubernetes" ? "bg-gray-300" : ""}
        //         >
        //             ⚙️
        //         </Button>
        //     </div>
        //
        //     {/* Panels */}
        //     <div className="flex-1">
        //         {activePanel === "nodes" && (
        //             <Panel className="p-4 border">
        //                 <h4 className="text-sm font-medium mb-4">Nodes</h4>
        //                 <ScrollArea className="max-w-[150px] bg-white rounded-md p-4 border">
        //                     {["Frontend", "Backend", "Database", "Microservice"].map((node) => (
        //                         <Button
        //                             key={node}
        //                             draggable
        //                             className="cursor-pointer p-2 mb-2 w-full"
        //                             onDragStart={(e) => console.log(`Dragging ${node}`)}
        //                         >
        //                             {node}
        //                         </Button>
        //                     ))}
        //                 </ScrollArea>
        //             </Panel>
        //         )}
        //
        //         {activePanel === "templates" && (
        //             <Panel className="p-4 border">
        //                 <h4 className="text-sm font-medium mb-4">Templates</h4>
        //                 <ScrollArea className="max-w-[200px] bg-white rounded-md p-4 border">
        //                     {[
        //                         "Monolith",
        //                         "3-Tier",
        //                         "Microservices",
        //                         "Serverless",
        //                         "Basic K8s setup",
        //                         "Adv. Microservices",
        //                         "Stateful Workload",
        //                     ].map((template) => (
        //                         <Button
        //                             key={template}
        //                             draggable
        //                             className="cursor-pointer p-2 mb-2 w-full"
        //                             onDragStart={(e) => console.log(`Dragging ${template}`)}
        //                         >
        //                             {template}
        //                         </Button>
        //                     ))}
        //                 </ScrollArea>
        //             </Panel>
        //         )}
        //
        //         {activePanel === "kubernetes" && (
        //             <Panel className="p-4 border">
        //                 <h4 className="text-sm font-medium mb-4">Kubernetes (K8s)</h4>
        //                 <ScrollArea className="max-w-[200px] bg-white rounded-md p-4 border">
        //                     {["Ingress", "Persistent Storage", "ConfigMap", "Secret"].map((k8s) => (
        //                         <Button
        //                             key={k8s}
        //                             draggable
        //                             className="cursor-pointer p-2 mb-2 w-full"
        //                             onDragStart={(e) => console.log(`Dragging ${k8s}`)}
        //                         >
        //                             {k8s}
        //                         </Button>
        //                     ))}
        //                 </ScrollArea>
        //             </Panel>
        //         )}
        //     </div>
        // </div>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Nodes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Basic</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>

                    <DropdownMenuItem

                        onDragStart={(event) => handlenDragStart(event, 'frontend')}
                        draggable
                    >
                        Frontend

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Backend

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Database

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Microservice

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SideMenuWithPanels;
