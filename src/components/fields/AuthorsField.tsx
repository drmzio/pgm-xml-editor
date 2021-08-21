import React, { useRef, useState } from 'react';
import {
  Avatar, Box, Button,
  FormLabel, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Dialog, DialogTitle, DialogContent, TextField, Stack, Divider, InputAdornment, Popper, CircularProgress, Tooltip
} from '@material-ui/core';
import { AuthorType } from '../../types';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  authors: AuthorType[];
  onChange: (k, v) => void;
}

type SearchResult = {
  uuid: string;
  username: string;
  username_history?: any;
  textures: any;
  created_at: any;
}

const initialValues = { uuid: '', name: '', contribution: '' };

export default function AuthorsField({ authors, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<SearchResult>(null);
  const searchRef = useRef(null);

  const removeAuthor = () => {
    const newAuthors = [ ...authors ];
    newAuthors.pop();
    onChange('authors', newAuthors);
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
    const findAuthor = authors.find(a => a.uuid === uuid);

    if (findAuthor) {
      alert('Duplicate!');
      return;
    }

    onChange('authors', [
      ...authors,
      {
        uuid: uuid,
        name: username,
        contribution: null,
      }
    ]);
    setOpen(false);
    setSearch('');
    setResult(null);
    setValues(initialValues);
  };

  const handleApplyValues = () => {
    setSearch('');
    setValues({
      uuid: result.uuid,
      name: result.username,
      contribution: ''
    });
  };

  const handleDialogClose = () => {
    setSearch('');
    setResult(null);
    setValues(initialValues);
  };

  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: -0.5 }}>
        <FormLabel component="div" sx={{ mr: 'auto' }}>Authors</FormLabel>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddAuthor}>Add author</Button>
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleCloseDialog} TransitionProps={{ onExit: handleDialogClose }}>
          <DialogTitle>Add author</DialogTitle>
          <DialogContent>
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
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end', color: 'text.secondary' }}>
              <Stack direction="row-reverse" spacing={1}>
                <Button variant="contained">Save</Button>
                <Button color="inherit" onClick={handleCloseDialog}>Cancel</Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      {authors.length > 0 && (
        <List dense sx={{ '& > * + *': { mt: 1 } }}>
          {authors.map((author, i) => (
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
                <IconButton onClick={removeAuthor}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
