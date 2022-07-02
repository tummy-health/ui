import React, { FC } from 'react';

import noop from 'utils/noop';

const DateInput: FC<Props> = ({ id, onChange = noop, value = '' }) => (
  <input
    id={id}
    onChange={(event) => onChange(event.target.value)}
    type="date"
    value={value}
  />
);

interface Props {
  id?: string;
  onChange?: (input: string) => void;
  value?: string;
}

export default DateInput;
