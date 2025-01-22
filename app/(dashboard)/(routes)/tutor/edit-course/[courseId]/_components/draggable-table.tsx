'use client'

import PreviewCard from "@/components/ui/preview-card";
import { useRouter } from "next/navigation";
import {useState } from "react";

interface DraggableTableProps {
    objects: Array<Object>;
    courseId: string | null;
}

interface Object {
    id: string;
    title: string;
    index: number;
}

const DraggableTable = ({ objects, courseId }: DraggableTableProps) => {
    const [draggedItem, setdraggedItem] = useState<Object | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const handleStartDrag = (event: React.DragEvent, obj: Object) => {
        setdraggedItem(obj);
        event.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    const handleDrop = async (event: React.DragEvent, targetItem: Object) => {
        event.preventDefault();
        setIsDragging(false);
        if (!courseId) return;
        if (!draggedItem || draggedItem?.id === targetItem?.id) return;


        try{
            const response = await fetch(`/api/courses/${courseId}/courseModules/reorder`,
                { method: "PATCH",
                    body: JSON.stringify({targetItem: targetItem, draggedItem: draggedItem}) });
            if (!response.ok) return new Error(response.statusText);
            router.refresh();
        }catch{
            return new Error("Failed to reorder modules");
        }
    }


    return (
        <table className="w-full border-separate border-spacing-y-2">
            <tbody>
                {objects.length ? objects.map((obj) =>
                    <tr draggable={true}
                        className={`cursor-move transition-all duration-200 ${isDragging ? 'opacity-40' : ''}`}
                        onDragStart={(e) => handleStartDrag(e, obj)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, obj)}
                        key={obj?.id}>
                        <td className="">
                            <PreviewCard object={obj} variant="module" isPublished={obj} />
                        </td>
                    </tr>) : ''
                }
            </tbody>
        </table>
    );
}

export default DraggableTable;