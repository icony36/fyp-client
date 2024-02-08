import React, { useState, useContext, useRef, useEffect } from "react";

import styled, { css } from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import LogoIcon from "../../images/logo-icon.png";

import { AuthContext } from "../../contexts";
import { ChatContext } from "../../contexts/ChatContext";
import { useToast } from "../../hooks/useToast";
import { sendMessage } from "../../services/rasa";
import { Heading } from "../../ui/Typography";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import HeadingBar from "../../components/HeadingBar";
import { ProfileImage } from "../../ui/ProfileImage";
import { getFullName } from "../../utils/helpers";
import { LoadingTyping } from "../../ui/Loading";

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 3px;
  box-sizing: border-box;
  padding: 0 40px 40px 40px;
  justify-content: space-between;
`;

const ChatbotMessageContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;
`;

const ChatbotActionArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ isuser }) =>
    isuser &&
    css`
      justify-content: flex-end;
    `};
`;

const MessageItem = styled.div`
  background-color: white;
  border-radius: 10px 10px 10px 0;
  margin: 16px 20px 16px 0;
  padding: 10px 16px;

  ${({ isuser }) =>
    isuser &&
    css`
      border-radius: 10px 10px 0 10px;
    `}
`;

const Message = ({
  message = { isUser: false, text: "" },
  isLoading = false,
}) => {
  return (
    <MessageContainer isuser={message.isUser ? 1 : undefined}>
      {!message?.isUser && (
        <ProfileImage>
          <img src={LogoIcon} alt="Chatbot icon" />
        </ProfileImage>
      )}

      <MessageItem isuser={message.isUser ? 1 : undefined}>
        {isLoading ? (
          <div style={{ padding: "10px 16px" }}>
            <LoadingTyping />
          </div>
        ) : (
          <Heading as="h3">{message.text}</Heading>
        )}
      </MessageItem>
    </MessageContainer>
  );
};

const Chatbot = () => {
  const { messages, setMessages, setUserMessage } = useContext(ChatContext);

  const { auth } = useContext(AuthContext);

  const { toast } = useToast();

  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });

    if (messages.length <= 0) {
      setMessages([
        {
          text: `Hello ${getFullName(
            auth.firstName,
            auth.lastName
          )}! Welcome to UniBot. How may I assist you today?`,
          isUser: false,
        },
      ]);
    }
  }, [messages, setMessages, auth.firstName, auth.lastName]);

  const handleSend = (event) => {
    event.preventDefault();

    if (input.trim() !== "") {
      setUserMessage(input);
      handleSendMessage(input);
      setInput("");
    }
  };

  const handleSendMessage = async (input) => {
    try {
      setIsLoading(true);
      const res = await sendMessage({ sender: auth.id, message: input });
      setMessages((prevState) => [...prevState, ...res]);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const renderMessages = () => {
    if (messages.length < 1) {
      return;
    }

    return messages.map((message, index) => {
      return <Message key={index} message={message} />;
    });
  };

  return (
    <>
      <ChatbotContainer>
        <HeadingBar
          style={{ margin: "0 -40px" }}
          title="Chat with UniBot"
        ></HeadingBar>
        <ChatbotMessageContainer>
          {renderMessages()}
          {isLoading && <Message isLoading />}
          <div ref={messagesEndRef}></div>
        </ChatbotMessageContainer>

        <form onSubmit={handleSend}>
          <ChatbotActionArea>
            <Input
              containerProps={{ style: { flex: 1, marginRight: "10px" } }}
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
            />

            <Button
              style={{
                height: "52px",

                padding: "16px",
                minWidth: "120px",
              }}
              primary="true"
              withicon="true"
              type="submit"
              disabled={isLoading}
            >
              Send
              <SendIcon />
            </Button>
          </ChatbotActionArea>
        </form>
      </ChatbotContainer>
    </>
  );
};

export default Chatbot;
