import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";
import "./App.css";

import { AuthProvider } from "./contexts";
import { ChatProvider } from "./contexts/ChatContext";
import { ROLE } from "./constants";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import UserNewPage from "./pages/UserNewPage";
import UserEditPage from "./pages/UserEditPage";
import KnowledgesPage from "./pages/KnowledgesPage";
import KnowledgeNewPage from "./pages/KnowledgeNewPage";
import KnowledgeEditPage from "./pages/KnowledgeEditPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import StudentProfileEditPage from "./pages/StudentProfileEditPage";
import TicketsPage from "./pages/TicketsPage";
import TicketPage from "./pages/TicketPage";
import TicketNewPage from "./pages/TicketNewPage";
import ChatbotPage from "./pages/ChatbotPage";
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
  // const { Toast } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile/" element={<ProfilePage />} />
                  <Route path="/profile/edit" element={<ProfileEditPage />} />
                  <Route path="/chatbot" element={<ChatbotPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={[ROLE.admin]} />}>
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/new" element={<UserNewPage />} />
                  <Route path="/users/:id" element={<UserEditPage />} />
                </Route>
                <Route
                  element={
                    <ProtectedRoute allowedRoles={[ROLE.staff, ROLE.student]} />
                  }
                >
                  <Route path="/tickets/:id" element={<TicketPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={[ROLE.staff]} />}>
                  <Route path="/tickets/" element={<TicketsPage />} />
                  <Route path="/knowledges" element={<KnowledgesPage />} />
                  <Route
                    path="/knowledges/new"
                    element={<KnowledgeNewPage />}
                  />
                  <Route
                    path="/knowledges/:id"
                    element={<KnowledgeEditPage />}
                  />
                </Route>
                <Route
                  element={<ProtectedRoute allowedRoles={[ROLE.student]} />}
                >
                  <Route path="/tickets/new" element={<TicketNewPage />} />
                  <Route
                    path="/profile/student/edit"
                    element={<StudentProfileEditPage />}
                  />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ThemeProvider>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
