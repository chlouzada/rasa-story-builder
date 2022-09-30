import { useRef, useEffect } from 'react';
import { useStoryStore } from '../stores/story';

export const ScrollToBottom = () => {
  const { steps } = useStoryStore();
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  }, []);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [steps]);
  return <div ref={ref} />;
};
