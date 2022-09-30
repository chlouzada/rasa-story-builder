import { useIntentsStore } from '../stores/intents';
import { Draggable } from './Draggable';

const IntentItem: React.FC<{ name: string; examples: string[] }> = ({
  name,
  examples,
}) => {
  return (
    <Draggable id={name} data={{ name, type: 'INTENT' }}>
      <div className="m-2 p-2 shadow-md">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export const IntentsView = ({ className }: { className?: string }) => {
  const { intents } = useIntentsStore();
  return (
    <div className={className}>
      <h2>Intent Container</h2>
      <div>
        {intents.map((intent, index) => (
          <IntentItem key={`${intent.name}-${index}}`} {...intent} />
        ))}
      </div>
    </div>
  );
};
