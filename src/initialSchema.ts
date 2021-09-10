export const initialSchema = {
  name: 'Airship Battle',
  version: '1.0.4',
  objective: 'Leak lava from the enemy\'s obsidian core into the void',
  gamemode: 'ctw',
  authors: [
    { uuid: null, name: 'John Doe', contribution: null },
    { uuid: '3c7db14d-ac4b-4e35-b2c6-3b2237f382be', name: 'Apple', contribution: null },
    { uuid: 'ef4ea031-998f-4ec9-b7b6-1bdd428bcef8', name: 'Plastix', contribution: null },
  ],
  rules: [
    'Players may not obstruct the majority of the lane with lava or obsidian.',
    'Players may not use lava or obsidian to block a team\'s spawn.'
  ],
  teams: [
    { id: 'blue-team', color: 'blue', max: 32, name: 'Blue' },
    { id: 'red-team', color: 'dark red', max: 32, name: 'Red' },
  ],
  kits: null,
  wools: null,
  flags: null,
};
