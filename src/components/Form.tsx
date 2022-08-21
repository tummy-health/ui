import React, { FC, ReactNode } from 'react';

import noop from 'utils/noop';

const Form: FC<Props> = ({ children, onSubmit = noop }) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </form>
);

interface Props {
  children: ReactNode;
  onSubmit?: () => void;
}

export default Form;
