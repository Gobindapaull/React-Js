import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

type ItemProps = {
  id: string;
};
function SortableItem({ id }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px",
    marginBottom: "10px",
    background: "#1e1e1e",
    color: "white",
    borderRadius: "10px",
    cursor: "grab",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

const defaultItems = ["React", "Vue", "Angular", "Svelte"];

export default function App() {
  const [items, setItems] = useState<string[]>([]);
  // Load from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("items");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(defaultItems);
    }
  }, []);
  // Save to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div
      style={{
        width: "300px",
        margin: "50px auto",
      }}
    >
      <h1>Drag and Drop</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item} id={item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
