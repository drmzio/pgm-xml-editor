import Draggable from 'react-draggable';
import { Portal, Paper, Typography, AppBar, IconButton, Toolbar, Box, Stack, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const frameSize = 500;

const useStyles = makeStyles(theme => ({
  dialog: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.modal + 1,
    width: frameSize,
    maxWidth: frameSize,
    overflow: 'hidden'
  },
  dialogHeader: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  dialogToolbar: {
    paddingLeft: theme.spacing(1)
  },
  frameContainer: {
    position: 'relative',
    width: '100%',
    height: frameSize,
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  }
}));

export default function ReferenceDialog({ url, onClose }) {
  const classes = useStyles();

  const handleOpenTab = () => {
    window.open(url, '_blank');
  };

  return (
    <Portal>
      <Draggable
        handle={'[class*="MuiAppBar-root"]'}
        cancel="#dialog-content"
        defaultPosition={{ x: (window.innerWidth / 2) - (frameSize / 2), y: (window.innerHeight / 2) - (frameSize / 2) }}
      >
        <Paper
          elevation={12}
          className={classes.dialog}
        >
          <AppBar position="static" color="transparent" className={classes.dialogHeader} style={{ cursor: 'move' }}>
            <Toolbar variant="dense" className={classes.dialogToolbar}>
              <Typography variant="h6" component="div">
                Reference
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Stack direction="row" spacing={1} sx={{ mr: -1 }}>
                <Tooltip title="Open in a new tab">
                  <IconButton size="small" onClick={handleOpenTab}>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton size="small" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Toolbar>
          </AppBar>
          <div className={classes.frameContainer} id="dialog-content">
            <iframe
              title="pgm-docs"
              src={url}
              frameBorder="0"
            />
          </div>
        </Paper>
      </Draggable>
    </Portal>
  )
}
