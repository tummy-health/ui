import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import noop from 'utils/noop';

const Button: FC<Props> = ({
  children,
  isLoading = false,
  isSubmit = false,
  onClick = noop,
}) => (
  <button onClick={onClick} type={isSubmit ? 'submit' : 'button'}>
    {isLoading ? <LoadingIndicator name={children} /> : children}
  </button>
);

interface Props {
  children: string;
  isLoading?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

export default Button;
