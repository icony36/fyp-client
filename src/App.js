import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, pink } from '@mui/material/colors';
import './App.css';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import UserNewPage from './pages/UserNewPage';
import KnowledgesPage from './pages/KnowledgesPage';
import KnowledgeNewPage from './pages/KnowledgeNewPage';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const App = () => (

  <Router>
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/user/new"  element={<UserNewPage />} />
        <Route path="/knowledges" element ={<KnowledgesPage />} />
        <Route path="/knowledge/new" element ={<KnowledgeNewPage />} />
      </Routes>
    </ThemeProvider>      
  </Router>
);


export default App;
