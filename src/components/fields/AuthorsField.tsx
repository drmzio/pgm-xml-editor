import React from 'react';
import {
  Avatar, Box, Button,
  FormLabel, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@material-ui/core';
import { AuthorType } from '../../types';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  authors: AuthorType[];
  onChange: (k, v) => void;
}

export default function AuthorsField({ authors, onChange }: Props) {
  const removeAuthor = () => {
    const newAuthors = [ ...authors ];
    newAuthors.pop();
    onChange('authors', newAuthors);
  };
  const handleAddAuthor = () => {
    const newAuthors = [ ...authors ];
    newAuthors.push(authors[authors.length - 1]);
    onChange('authors', newAuthors);
  };

  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <FormLabel component="div" sx={{ mr: 'auto' }}>Authors</FormLabel>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddAuthor}>Add author</Button>
      </Box>
      {authors.length > 0 && (
        <List dense sx={{ '& > * + *': { mt: 1 } }}>
          {authors.map((author, i) => (
            <ListItem key={i} disableGutters disablePadding button>
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
                primary={author.text}
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
