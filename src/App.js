import React, { useState, useEffect } from 'react';
import QuoteMachine from './components/QuoteMachine';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { red, green, orange, blue, purple } from "@material-ui/core/colors";

const initialTheme = {
  palette: {
    primary: red,
    secondary: green,
    type: 'light'
  },
  typography: {
    fontFamily: [
      'Baloo',
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  }
}

const colors = [red, green, orange, blue, purple];

const changeTheme = (theme, setTheme) => {
  let randomIndex;
  // Choose a new color (not the same as current).
  do {
    randomIndex = Math.floor(Math.random() * colors.length);
  } while (colors[randomIndex] === theme.palette.primary)

  const updatedTheme = {
    ...theme,
    palette: {
      ...theme.palette,
      // 500 is the default shade (main); using a bit darker shade as the foreground color is white.
      background: { ...theme.palette.background, default: colors[randomIndex][800] },
      primary: colors[randomIndex],
    }
  }
  setTheme(updatedTheme);
}

function App() {
  const [theme, setTheme] = useState(initialTheme);
  const muiTheme = createMuiTheme(theme);

  useEffect(() => {
    changeTheme(initialTheme, setTheme);
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <QuoteMachine color={theme.palette.primary[800]} changeTheme={() => changeTheme(theme, setTheme)} />
    </ThemeProvider>
  );
}

export default App;