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
  width: max-content;
  margin: 16px 20px 16px 0;
  padding: 10px 16px;

  ${({ isuser }) =>
    isuser &&
    css`
      border-radius: 10px 10px 0 10px;
    `}
`;

const Message = ({ message }) => {
  return (
    <MessageContainer isuser={message.isUser}>
      {!message.isUser && (
        <ProfileImage>
          <img src={LogoIcon} alt="Chatbot icon" />
        </ProfileImage>
      )}
      <MessageItem isuser={message.isUser}>
        <Heading as="h3">{message.text}</Heading>
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

  useEffect(() => {
    messagesEndRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      const res = await sendMessage({ sender: auth.id, message: input });

      setMessages((prevState) => [...prevState, ...res]);
    } catch (err) {
      toast.error(err.message);
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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                padding: "16px",
                minWidth: "120px",
              }}
              primary
              endIcon={<SendIcon />}
              type="submit"
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
