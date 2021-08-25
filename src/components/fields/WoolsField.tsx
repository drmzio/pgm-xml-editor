import React from 'react';
import { FieldProps } from '../../types';
import { DYE_COLORS } from '../../constants';

type WoolType = {
  team: string;
  color: string;
}

export default function WoolsField({ name, value, onUpdate }: FieldProps) {
  return (
    <ul>
      {Object.keys(DYE_COLORS).map(color => (
        <li key={color}>{color.toLowerCase().replaceAll('_', ' ')}</li>
      ))}
    </ul>
  )
}
