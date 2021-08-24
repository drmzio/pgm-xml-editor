import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Stack,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Box, Button, Popover, MenuList, MenuItem, ListItemIcon, Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { GAMEMODES } from './constants';
import AuthorsField from './components/fields/AuthorsField';
import SimpleBar from 'simplebar-react';
import { initialSchema } from './initialSchema';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AddIcon from '@material-ui/icons/Add';
import FileDownloadOutlinedIcon from '@material-ui/icons/FileDownloadOutlined';
import ReferenceDialog from './components/ReferenceDialog';
import { GlobalContext } from './context';

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
    borderBottom: `1px solid ${theme.palette.divider}`,
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
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  }
}));

class XmlTag {
  tag: string;
  attributes?: object;
  children?: string | any[];

  constructor(tag, attributes: any = null, children: (string | any[]) = []) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
  }
  toString() {
    let start = `<${this.tag}`;
    let end = `</${this.tag}>`;
    let comment = '';

    if (this.attributes) {
      Object.keys(this.attributes).forEach(attr => {
        const value = this.attributes[attr];
        if (value !== null && !attr.startsWith('_')) {
          start += ` ${attr}="${value}"`;
        }
      });

      if (this.attributes.hasOwnProperty('_comment')) {
        comment = ` <!-- ${this.attributes['_comment']} -->`;
      }
    }

    if (typeof this.children === 'string') {
      start += `>${this.children}`;
    } else if (this.children.length > 0) {
      start += '>\n';
      start += this.children
        .map(c => '\t' + c.toString())
        .join('\n');
      start += '\n';
    } else {
      end = '';
      start += ' />';
    }

    return start + end + comment;
  }
}
const teams = new XmlTag('authors', null, [
  new XmlTag('author', { uuid: 'xxxx-xxxx-xxxx-xxxx', _comment: 'Apple' }),
  new XmlTag('author', { uuid: 'xxxx-xxxx-xxxx-xxxx', _comment: 'Plastix' }),
]);

console.log(teams.toString());

// const defaultXml = [
//   '<?xml version="1.0"?>',
//   '<map proto="1.4.0">',
//   '<name>Map Name</name>',
//   '<version>1.0.0</version>',
//   '<authors>',
//   '\t<author>aPerson</author>',
//   '</authors>',
//   '</map>'
// ];

function App() {
  const classes = useStyles();
  const { reference, setReference } = useContext(GlobalContext);
  const [schema, setSchema] = useState(initialSchema);
  const [anchorEl, setAnchorEl] = useState(null);

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
    let xml: any = [];
    const keys = Object.keys(schema);

    xml.push('<?xml version="1.0" encoding="UTF-8" ?>');
    xml.push('<map proto="1.4.0">');

    keys.forEach(k => {
      let xml2 = [];
      xml2.push(`<${k}>`); // Start xml
      xml2.push(k);
      xml2.push(`</${k}>`); // End xml
      xml.push( xml2.join('') );
    });
    xml.push('</map>');
    xml = xml.join('\n');

    alert(xml);
  };

  const handleClickMenu = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={handleClickMenu}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuList onClick={() => setAnchorEl(null)}>
              <MenuItem>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  New...
                </Typography>
              </MenuItem>
              <Divider variant="inset" component="li" sx={{ my: 1 }} />
              <MenuItem>
                <ListItemIcon>
                  <FileDownloadOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Generate XML
                </Typography>
              </MenuItem>
              <Divider variant="inset" component="li" sx={{ my: 1 }} />
              <MenuItem>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  About PGM-XML Editor
                </Typography>
              </MenuItem>
            </MenuList>
          </Popover>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PGM-XML Editor
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
              <Stack spacing={3} sx={{ p: 2 }}>
                <div>
                  <TextField
                    fullWidth
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
                        {`${GAMEMODES[gamemode]} (${gamemode.toUpperCase()})`}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    fullWidth
                    id="filled-basic"
                    label="Map name"
                    variant="outlined"
                    name="name"
                    value={schema.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    id="filled-basic2"
                    label="Objective"
                    variant="outlined"
                    name="objective"
                    value={schema.objective}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <AuthorsField authors={schema.authors} onChange={updateSchema} />
                </div>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dicta distinctio dolor esse exercitationem in inventore ipsam iure laboriosam magnam, magni molestiae necessitatibus, obcaecati possimus quidem sequi sint suscipit totam!
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
      {Boolean(reference) && <ReferenceDialog url={reference} onClose={() => setReference(null)} />}
    </div>
  )
}

export default App;
