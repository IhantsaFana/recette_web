import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RecipeForm from './components/RecipeForm';
import './App.css';  // Ajout de l'import des styles

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <RecipeForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
