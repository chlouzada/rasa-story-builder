import React from 'react';
import { Link, useLocation } from '@tanstack/react-location';
import { useStoryStore } from '../stores/story';
import { openModal } from '@mantine/modals';
import { Textarea, Button } from '@mantine/core';

const NavItem = ({
  to,
  children,
  exact,
}: {
  to: string;
  children: React.ReactNode;
  exact?: true;
}) => {
  const activeProps = () => {
    return {
      style: {
        fontWeight: 'bold',
      },
    };
  };

  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      className="py-1 px-2 text-white"
      getActiveProps={activeProps}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  return (
    <div className="flex md:gap-3">
      <NavItem to="/story" exact>
        Story
      </NavItem>
      <NavItem to="/import">Import</NavItem>
    </div>
  );
};

const Control = () => {
  const { steps, clear, toggleContent, showContent } = useStoryStore();
  const location = useLocation();
 

  const yaml = steps
    .map((step, index) => {
      let breakLine = '\n';
      if (index === steps.length - 1) breakLine = '';
      if (step.type === 'ACTION') return `- action: ${step.name}${breakLine}`;
      return `- intent: ${step.name}${breakLine}`;
    })
    .join('');

  const modal = () => {
    if (steps.length === 0) return;

    openModal({
      title: 'Story made as YAML',
      centered: true,
      size: 'lg',
      children: (
        <div>
          <Textarea readOnly autosize value={yaml} minRows={2} />
          <div className="flex justify-end">
            <Button
              color="primary"
              onClick={() => navigator.clipboard.writeText(yaml)}
              className="mt-4"
            >
              Copy
            </Button>
          </div>
        </div>
      ),
    });
  };

  if (location.current.pathname === '/import') return <></>;

  return (
    <div className="flex md:gap-3">
      <button className="py-1 px-2 text-white" onClick={toggleContent}>
        {showContent ? 'Hide Content' : 'Show Content'}
      </button>

      <button className="py-1 px-2 text-white" onClick={modal}>
        Show YAML
      </button>

      <button className="py-1 px-2 text-white" onClick={clear}>
        Clear Story
      </button>
    </div>
  );
};

const Title = () => {
  return (
    <p className="font-extrabold text-white md:text-xl">Rasa Story Builder</p>
  );
};

export const Header = () => {
  return (
    <div className="p-2 bg-primary flex items-center justify-between w-full absolute shadow-md">
      <Title />
      <Control />
      <Navigation />
    </div>
  );
};
