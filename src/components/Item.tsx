import React, {forwardRef} from 'react';

export const Item = forwardRef<any,any>(({id, ...props}, ref) => {
  return (
    <div {...props} ref={ref}>{props.children}</div>
  )
});