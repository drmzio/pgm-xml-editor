import React, { useContext, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Dialog,
  TextField,
  Stack,
  Divider,
  Popper,
  CircularProgress,
  Tooltip,
  AppBar,
  Toolbar,
  Typography, Link
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import HelpIcon from '@material-ui/icons/Help';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { GlobalContext } from '../../context';
import { FieldProps } from '../../types';

interface AuthorType {
  uuid: string;
  name: string;
  contribution: string;
}

type SearchResult = {
  uuid: string;
  username: string;
  username_history?: any;
  textures: any;
  created_at: any;
}

const initialValues = { uuid: '', name: '', contribution: '' };

export default function AuthorsField({ name, value, onUpdate }: FieldProps) {
  const { setReference } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<SearchResult>(null);
  const [show, setShow] = useState(true);
  const searchRef = useRef(null);

  const removeAuthor = (index = 0) => {
    const newAuthors = value.filter((a, i) => i !== index);
    onUpdate(name, newAuthors);
  };
  const handleAddAuthor = () => {
    setOpen(true);
    //const newAuthors = [ ...authors ];
    //newAuthors.push(authors[authors.length - 1]);
    //onChange('authors', newAuthors);
  };

  const handleChangeValue = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleChangeSearch = (e: React.ChangeEvent) => {
    const { value } = e.currentTarget as HTMLInputElement;
    setSearch(value);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlayer();
  };

  const searchPlayer = () => {
    fetch(`https://api.ashcon.app/mojang/v2/user/${search}`, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then((data: SearchResult) => {
      console.log(data);
      setResult(data);
    })
  };

  const handleAddPlayer = () => {
    const { uuid, username } = result;

    // Checks for duplicates
    const findAuthor = value.find(a => a.uuid === uuid);

    if (findAuthor) {
      alert('Duplicate!');
      return;
    }

    onUpdate('authors', [
      ...value,
      {
        uuid: uuid,
        name: username,
        contribution: null,
      }
    ]);
    setOpen(false);
    dialogCleanUp();
  };

  const handleApplyValues = () => {
    setSearch('');
    setValues({
      uuid: result.uuid,
      name: result.username,
      contribution: ''
    });
  };

  // Resets the states to the initial values.
  const dialogCleanUp = () => {
    setSearch('');
    setResult(null);
    setValues(initialValues);
  };

  const handleClickReference = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setReference(e.currentTarget.href);
  };

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{ position: 'relative', py: 2, px: 2, ml: -2, mr: -2 }}
      style={{ borderLeft: '0 none', borderRight: '0 none', borderRadius: 0 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.5, pr: 4 }}>
        <FormLabel component="div" sx={{ mr: 'auto' }}>
          {`Authors (${value.length})`}
          <Tooltip disableInteractive={false} title={
            <>
              <div>A major author of the map</div>
              <div>
                <Link color="inherit" href="https://pgm.dev/docs/modules/general/main/#authors--contributors" onClick={handleClickReference}>
                  See reference
                  <ArrowRightAltIcon fontSize="small" sx={{ ml: 0.5 }} style={{ verticalAlign: 'middle' }} />
                </Link>
              </div>
            </>
          }>
            <HelpIcon sx={{ ml: 0.5 }} fontSize="inherit" color="disabled" tabIndex={0} style={{ verticalAlign: 'middle' }} />
          </Tooltip>
        </FormLabel>
        <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={handleAddAuthor}>Add author</Button>
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleCloseDialog} TransitionProps={{ onExit: dialogCleanUp }}>
          {/*<DialogTitle>Add author</DialogTitle>*/}
          <AppBar position="relative" color="transparent">
            <Toolbar>
              <Typography variant="h6">Add author</Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 3, pt: 0 }}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                label="Find player"
                helperText="Search for a player by their Minecraft username"
                value={search}
                onChange={handleChangeSearch}
                InputProps={{
                  ref: searchRef
                }}
              />
            </form>
            <Popper open={Boolean(search)} anchorEl={searchRef.current} disablePortal style={{ zIndex: 999 }}>
              <Paper elevation={8} style={{ width: searchRef.current?.getBoundingClientRect().width }}>
                {Boolean(result) ? (
                  <List dense sx={{ p: 1 }}>
                    <ListItem disableGutters disablePadding button onClick={handleAddPlayer}>
                      <ListItemAvatar>
                        <Avatar variant="square" src={`https://crafatar.com/avatars/${result.uuid}?overlay&size=40`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={result.username}
                        secondary={result.uuid}
                        sx={{ m: 0 }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Apply values">
                          <IconButton onClick={handleApplyValues}>
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                )}
              </Paper>
            </Popper>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Author name"
                helperText="The author without a Minecraft account"
                name="name"
                value={values.name}
                onChange={handleChangeValue}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Contribution"
                helperText="Explain how this person helped out"
                name="contribution"
                value={values.contribution}
                onChange={handleChangeValue}
              />
            </Stack>
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end', color: 'text.secondary' }}>
              <Stack direction="row-reverse" spacing={1}>
                <Button variant="contained">Save</Button>
                <Button color="inherit" onClick={handleCloseDialog}>Cancel</Button>
              </Stack>
            </Box>
          </Box>
        </Dialog>
      </Box>
      <div style={{ display: show ? 'block' : 'none' }}>
        {value.length > 0 && (
          <List dense sx={{ '& > * + *': { mt: 1 } }}>
            {value.map((author, i) => (
              <ListItem key={i} disableGutters disablePadding button onClick={() => setOpen(true)}>
                <ListItemAvatar>
                  {Boolean(author.uuid) ? (
                    <Avatar variant="square" src={`https://crafatar.com/avatars/${author.uuid}?overlay&size=40`} />
                  ) : (
                    <Avatar variant="square">
                      <PersonIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={author.name}
                  secondary={author.uuid}
                  sx={{ m: 0 }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Remove this author">
                    <IconButton onClick={() => removeAuthor(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <Box sx={{ position: 'absolute', top: 0, right: 0, m: 1.5 }}>
        <Tooltip title={show ? 'Minimize' : 'Maximize'}>
          <IconButton size="small" onClick={() => setShow(!show)}>
            <KeyboardArrowDownIcon fontSize="small" style={{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}
