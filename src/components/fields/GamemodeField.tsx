import React from 'react';
import { TextField } from '@material-ui/core';
import { GAMEMODES } from '../../constants';
import { FieldProps } from '../../types';

export default function GamemodeField({ name, value, onUpdate }: FieldProps) {
  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    onUpdate(name, value);
  };

  return (
    <TextField
      fullWidth
      select
      variant="filled"
      label="Gamemode"
      name={name}
      value={value}
      onChange={handleInputChange}
      SelectProps={{ native: true }}
    >
      {Object.keys(GAMEMODES).map(gamemode => (
        <option key={gamemode} value={gamemode}>
          {`${GAMEMODES[gamemode]} (${gamemode.toUpperCase()})`}
        </option>
      ))}
    </TextField>
  )
}
