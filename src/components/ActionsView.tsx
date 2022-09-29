const actions = [
  {
    name: 'action1',
  },
];

const ActionItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="m-2 p-2 shadow-md">
      <p>{name}</p>
    </div>
  );
};

export const ActionsView = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h2>Actions View</h2>
      <div>
        {actions.map((action) => (
          <ActionItem {...action} />
        ))}
      </div>
    </div>
  );
};
