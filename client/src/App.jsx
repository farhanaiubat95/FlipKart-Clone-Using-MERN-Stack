// Components
import Header from './components/header/Header.jsx';
import Routers from './routers/Routes.jsx';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Footer from './components/Footer.jsx';


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
        <div className='bg-[#f2f2f2]'>
          <Header />
          <Routers />

          <Footer />
        </div>
      </ThemeProvider >
    </>
  );
}
export default App;
