'use client'
import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase transformation
          backgroundColor: "#222222",
          fontSize: '16px',
          color: 'cyan'
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'black', // Change label color
          background: 'white',
          borderRadius: '7px',
          paddingLeft: '5px',
          paddingRight: '5px',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Pixelify Sans'
  },
  box: {
    fontFamily: 'Pixelify Sans'
  },
  formcontrol: {
    fontFamily: 'Pixelify Sans'
  },
  MuiFormLabel: {
    color: "white",
    backgroundColor: "White"
  }

  // Optionally, customize other aspects of the theme
});

export default theme;