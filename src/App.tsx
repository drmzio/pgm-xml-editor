import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Stack,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Box, Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { GAMEMODES } from './constants';
import AuthorsField from './components/fields/AuthorsField';
import SimpleBar from 'simplebar-react';
import { initialSchema } from './initialSchema';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  main: {
    backgroundColor: '#fff',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  grid: {
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
    '& > * + *': {
      borderLeft: `1px solid ${theme.palette.divider}`
    }
  },
  gridItem: {
    overflow: 'hidden',
    display: 'flex',
    height: '100%'
  }
}));

const defaultXml = [
  '<?xml version="1.0"?>',
  '<map proto="1.4.0">',
  '<name>Map Name</name>',
  '<version>1.0.0</version>',
  '<authors>',
  '\t<author>aPerson</author>',
  '</authors>',
  '</map>'
];

function App() {
  const classes = useStyles();
  const [schema, setSchema] = useState(initialSchema);

  const handleInputChange = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    updateSchema(name, value);
  };

  const updateSchema = (key: string, value: any) => {
    setSchema(prevSchema => ({
      ...prevSchema,
      [key]: value
    }));
  };

  const handleGenerateXml = () => {
    let xml = [];
    const keys = Object.keys(schema);

    xml.push('<?xml version="1.0"?>');
    xml.push('<map proto="1.4.0">');
    keys.forEach(k => {
      xml.push(`<${k}>${schema.name}</${k}>`);
    });
    xml.push('</map>');

    alert(xml.join('\n'));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PGM XML Editor
          </Typography>
          <Button variant="contained" onClick={handleGenerateXml}>
            Generate XML
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Grid container className={classes.grid}>
          <Grid item xs={4} sx={{ flexDirection: 'column' }} className={classes.gridItem}>
            <AppBar position="static" color="default" className={classes.header}>
              <Toolbar variant="dense">
                <Typography variant="h6" component="div" noWrap>
                  Map Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Box component={SimpleBar} sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }} autoHide={false}>
              <Stack spacing={3} sx={{ p: 3 }}>
                <TextField
                  select
                  variant="filled"
                  label="Gamemode"
                  name="gamemode"
                  value={schema.gamemode}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true
                  }}
                >
                  {Object.keys(GAMEMODES).map(gamemode => (
                    <option key={gamemode} value={gamemode}>
                      {GAMEMODES[gamemode]}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  id="filled-basic"
                  label="Map name"
                  variant="outlined"
                  name="name"
                  value={schema.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  id="filled-basic2"
                  label="Objective"
                  variant="outlined"
                  name="objective"
                  value={schema.objective}
                  onChange={handleInputChange}
                />
                <AuthorsField authors={schema.authors} onChange={updateSchema} />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ flexDirection: 'column' }} className={classes.gridItem}>
            <AppBar position="static" color="default" className={classes.header}>
              <Toolbar variant="dense">
                <Typography variant="h6" component="div" noWrap>
                  {GAMEMODES[schema.gamemode]}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box component={SimpleBar} sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }} autoHide={false}>
              amsdjn asjdn ajsnd
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ flexDirection: 'column' }} className={classes.gridItem}>
            <AppBar position="static" color="default" className={classes.header}>
              <Toolbar variant="dense">
                <Typography variant="h6" component="div" noWrap>
                  Advanced
                </Typography>
              </Toolbar>
            </AppBar>
            <Box component={SimpleBar} sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }} autoHide={false}>
              <pre style={{ margin: 0 }}>{JSON.stringify(schema, null, 2)}</pre>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default App;
