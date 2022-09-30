import React, { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

export const AnimatedList: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current &&
      autoAnimate(ref.current, {
        duration: 250,
      });
  }, [ref]);
  return <div ref={ref}>{children}</div>;
};
