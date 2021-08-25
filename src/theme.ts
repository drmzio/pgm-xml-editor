import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        colorDefault: {
          backgroundColor: defaultTheme.palette.background.paper,
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        dense: {
          [defaultTheme.breakpoints.up('sm')]: {
            paddingLeft: defaultTheme.spacing(2),
            paddingRight: defaultTheme.spacing(2),
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: defaultTheme.typography.pxToRem(18)
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        },
        notchedOutline: {
          '& legend': {
            fontSize: '0.835em'
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          minWidth: 80,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }
      }
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        disableInteractive: true,
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: defaultTheme.typography.pxToRem(15),
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        scroll: 'body'
      }
    },
  }
});
