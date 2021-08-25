import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldProps } from '../../types';

export default function ObjectiveField({ name, value, onUpdate }: FieldProps) {
  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    onUpdate(name, value);
  };

  return (
    <TextField
      fullWidth
      label="Objective"
      variant="outlined"
      name={name}
      value={value}
      onChange={handleInputChange}
    />
  )
}
