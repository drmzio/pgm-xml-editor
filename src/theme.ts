import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

export const theme = createTheme({
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: defaultTheme.typography.pxToRem(18)
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
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
      }
    },
  }
});
