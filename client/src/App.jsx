// Components
import Header from './components/header/Header.jsx';
import Routers from './routers/Routes.jsx';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';


// Apply styles
const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
});


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routers />

      </ThemeProvider >
    </>
  );
}
export default App;
