import { useDroppable } from '@dnd-kit/core';
import { AnimatedList } from './AnimatedList';

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

export const Droppable: React.FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  // const style = {
  //   opacity: isOver ? 1 : 0.5,
  // };

  return (
    <div
      ref={setNodeRef}
      // style={{ ...style }}
      className="flex flex-col grow min-h-full"
    >
      <AnimatedList>{props.children}</AnimatedList>
    </div>
  );
};