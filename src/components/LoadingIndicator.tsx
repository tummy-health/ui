import React, { FC } from 'react';

const LoadingIndicator: FC<Props> = ({ name } = {}) => {
  const testId = name ? `loading-indicator-${name}` : 'loading-indicator';
  return (
    <div aria-label="loading" role="status" data-testid={testId}>
      loading
    </div>
  );
};

interface Props {
  name?: string;
}

export default LoadingIndicator;
