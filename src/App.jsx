import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";
import "./App.css";

import { setTokenHeader } from "./services/api";
import { AuthContext } from "./contexts";
import { ROLE } from "./constants";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UserNewPage from "./pages/UserNewPage";
import KnowledgesPage from "./pages/KnowledgesPage";
import KnowledgeNewPage from "./pages/KnowledgeNewPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 180 * 1000, // set a default stale time to fetch data (in milliseconds)
    },
  },
});

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const App = () => {
  const { logout, resetAuth } = useContext(AuthContext);

  useEffect(() => {
    checkForToken();
  }, []);

  const checkForToken = () => {
    if (localStorage.jwtToken) {
      setTokenHeader(localStorage.jwtToken);

      try {
        resetAuth();
      } catch (err) {
        logout();
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/new" element={<UserNewPage />} />
              <Route path="/knowledges" element={<KnowledgesPage />} />
              <Route path="/knowledges/new" element={<KnowledgeNewPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
