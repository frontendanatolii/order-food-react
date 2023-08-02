import React from 'react';
import classes from './Input.module.css';

interface Props {
  id: string,
  label: string,
  input: {},
};

export type Ref = HTMLInputElement;

export const Input = React.forwardRef<Ref, Props>(({ id, label, input }, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={id}>{label}</label>
      <input {...input} id={id} ref={ref} />
    </div>
  )
});