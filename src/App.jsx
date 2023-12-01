import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";
import "./App.css";

import { ROLE } from "./constants";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UserNewPage from "./pages/UserNewPage";
import KnowledgesPage from "./pages/KnowledgesPage";
import KnowledgeNewPage from "./pages/KnowledgeNewPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
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
              <Route path="/users/" element={<NotFoundPage />} />
              <Route path="/tickets/" element={<NotFoundPage />} />
              <Route path="/profile/" element={<NotFoundPage />} />
              <Route path="/users/new" element={<UserNewPage />} />
              <Route path="/knowledges" element={<KnowledgesPage />} />
              <Route path="/knowledges/new" element={<KnowledgeNewPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
