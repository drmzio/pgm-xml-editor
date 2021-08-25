import React from 'react';
import { FieldProps } from '../../types';

type TeamType = {
  id: string;
  color: string;
  max: number;
  name: string;
}

export default function TeamsField({ name, value, onUpdate }: FieldProps) {
  return (
    <ul>
      {value.map((team: TeamType) => (
        <li key={team.id}>{team.name}</li>
      ))}
    </ul>
  )
}
