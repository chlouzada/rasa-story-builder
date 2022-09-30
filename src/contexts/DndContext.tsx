import { useState } from 'react';
import { useStoryStore } from '../stores/story';
import {
  DndContext as DndKitContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  closestCenter,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// TODO: translate initial position to the cursor]
// TODO: style
const Widget = ({ name, x, y }: { name: string; x: number; y: number }) => {
  return (
    <div className="w-12">
      <p>{name}</p>
    </div>
  );
};

export const DndContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [widget, setWidget] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);
  const store = useStoryStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (isNaN(event.active.id as any)) {
      if (over)
        store.addStep({
          name: active.data.current?.name,
          type: active.data.current?.type,
        });
      setActiveId(null);
      return;
    }

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id as number);
      const newIndex = items.indexOf(over?.id as number);
      setActiveId(null);
      return store.moveStep(oldIndex, newIndex);
    }

    // console.log(event);

    // if (String(active.id).split('-').length === 2) {
    //   if (isOver) {
    //     // TODO: move step
    //     return;
    //   }

    //   const [index] = String(active.id).split('-');
    //   store.removeStep(Number(index));
    //   return;
    // }
  };

  // function handleDragEnd(event: DragEndEvent) {
  //   const {active, over} = event;

  //   console.log(event)

  //   if (active.id !== over?.id) {
  //     console.log("aqui",event)
  //     // setItems((items) => {
  //     //   const oldIndex = items.indexOf(active.id);
  //     //   const newIndex = items.indexOf(over.id);

  //     //   return arrayMove(items, oldIndex, newIndex);
  //     // });
  //   }
  // }

  const handleDragStart = (event: DragStartEvent) => {
    // setWidget({ name: event.active.data.current?.name, x: 0, y: 0 });
    setActiveId(event.active.id as number);
  };

  const items = store.steps.map((_, index) => index);

  return (
    <DndKitContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setWidget(null)}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeId && <Widget name='test' x={1} y={1} />}
      </DragOverlay>
    </DndKitContext>
  );
};
