import React, { FC } from 'react';

import noop from 'utils/noop';

const NumericInput: FC<Props> = ({
  id,
  max,
  min,
  onChange = noop,
  value = '',
}) => (
  <input
    id={id}
    max={max}
    min={min}
    onChange={(event) => onChange(parseInt(event.target.value, 10))}
    type="number"
    value={value}
  />
);

interface Props {
  id?: string;
  max?: number;
  min?: number;
  onChange?: (input: number) => void;
  value?: number;
}

export default NumericInput;
