import React, { useContext, useState } from 'react';
import {
  Avatar, Box, Button, FormLabel, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Tooltip, Link, Grid, Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import HelpIcon from '@material-ui/icons/Help';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ShieldOutlinedIcon from '@material-ui/icons/ShieldOutlined';
import { GlobalContext } from '../../context';
import { FieldProps } from '../../types';
import { CHAT_COLORS } from '../../constants';

const colorToHex = (color: string) => {
  const c = color.toUpperCase().replace(' ', '_');
  return CHAT_COLORS[c];
};

type TeamType = {
  id: string;
  color: string;
  max: number;
  name: string;
}

export default function TeamsField({name, value, onUpdate}: FieldProps) {
  const {setReference} = useContext(GlobalContext);
  const [show, setShow] = useState(true);

  const removeAuthor = (index = 0) => {
    const newAuthors = value.filter((a, i) => i !== index);
    onUpdate(name, newAuthors);
  };

  const handleClickReference = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setReference(e.currentTarget.href);
  };

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{position: 'relative', py: 2, px: 2, ml: -2, mr: -2}}
      style={{borderLeft: '0 none', borderRight: '0 none', borderRadius: 0}}
    >
      <Box sx={{display: 'flex', alignItems: 'center', mt: -0.5, pr: 4}}>
        <FormLabel component="div" sx={{mr: 'auto'}}>
          {`Teams (${value.length})`}
          <Tooltip disableInteractive={false} title={
            <>
              <div>A major author of the map</div>
              <div>
                <Link color="inherit" href="https://pgm.dev/docs/modules/general/main/#authors--contributors" onClick={handleClickReference}>
                  See reference
                  <ArrowRightAltIcon fontSize="small" sx={{ml: 0.5}} style={{verticalAlign: 'middle'}}/>
                </Link>
              </div>
            </>
          }>
            <HelpIcon sx={{ml: 0.5}} fontSize="inherit" color="disabled" tabIndex={0} style={{verticalAlign: 'middle'}}/>
          </Tooltip>
        </FormLabel>
        <Button size="small" variant="outlined" startIcon={<AddIcon/>}>Add team</Button>
      </Box>
      <div style={{display: show ? 'block' : 'none'}}>
        {value.length > 0 && (
          <Box sx={{mt: 2}}>
            <Grid container spacing={1}>
              {value.map((team: TeamType, i) => (
                <Grid item xs={12} lg={6}>
                  <ListItem
                    ContainerComponent="div"
                    disableGutters
                    disablePadding
                    button
                    sx={{border: (theme) => `1px solid ${theme.palette.divider}`}}
                    style={{height: 40}}
                  >
                    <ListItemAvatar style={{minWidth: 48}}>
                      <Avatar variant="square" style={{margin: -1, backgroundColor: colorToHex(team.color)}}>
                        <ShieldOutlinedIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={team.name}
                      secondary={
                        <Typography variant="caption" component="div" sx={{color: 'text.secondary'}} style={{marginTop: -5}}>
                          {`${team.max} players`}
                        </Typography>}
                      sx={{m: 0}}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Remove this team">
                        <IconButton onClick={() => removeAuthor(i)}>
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
      <Box sx={{position: 'absolute', top: 0, right: 0, m: 1.5}}>
        <Tooltip title={show ? 'Minimize' : 'Maximize'}>
          <IconButton size="small" onClick={() => setShow(!show)}>
            <KeyboardArrowDownIcon fontSize="small" style={{transform: show ? 'rotate(180deg)' : 'rotate(0deg)'}}/>
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}
