const intents = [
  {
    name: 'intent1',
    examples: ['example1'],
  },
];

const IntentItem: React.FC<{ name: string; examples: string[] }> = ({
  name,
  examples,
}) => {
  return (
    <div className="m-2 p-2 shadow-md">
      <p>{name}</p>
    </div>
  );
};

export const IntentsView = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h2>Intent Container</h2>
      <div>
        {intents.map((intent) => (
          <IntentItem {...intent} />
        ))}
      </div>
    </div>
  );
};
