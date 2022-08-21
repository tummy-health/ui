import React, { FC } from 'react';

const Label: FC<Props> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor}>{children}</label>
);

interface Props {
  children: string;
  htmlFor: string;
}

export default Label;
