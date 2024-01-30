import { PropsWithChildren } from 'react';

export const ScrollTab = ({ children }: PropsWithChildren) => {
  return (
    <div className="scrollbar-inline sticky top-0 z-50 mb-4 mt-2 flex overflow-x-scroll border-b ">
      {children}
    </div>
  );
};
