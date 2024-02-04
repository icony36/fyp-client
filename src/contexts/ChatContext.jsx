import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to UniBot. How may I assist you today?",
      isUser: false,
    },
  ]);

  const setUserMessage = (text) => {
    setMessages((prevState) => [...prevState, { isUser: true, text }]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, setUserMessage, clearMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};
