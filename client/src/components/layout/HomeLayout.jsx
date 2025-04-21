import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import components
import Header from '../header/Header';
import Routers from '../../routers/Routers';
import DataProvider from "../../context/DataProvider.jsx";

// Apply styles
const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

function HomeLayout() {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routers />
        {/* <footer/> */}
      </ThemeProvider>
    </DataProvider>
  );
}
export default HomeLayout;
