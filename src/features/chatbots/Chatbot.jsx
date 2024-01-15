import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { AuthContext } from "../../contexts";
import { ChatContext } from "../../contexts/ChatContext";
import { useToast } from "../../hooks/useToast";
import { sendMessage } from "../../services/rasa";

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

      console.log(res);

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
      return (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography>Ask chatbot something...</Typography>
        </div>
      );
    }

    let replies = [];

    let botRes = [];

    // messages.map((message, index) => {
    //   if (message.isUser) {
    //     if (botRes.length > 0) {
    //       const messages = botRes;

    //       replies.push(<BotMessage key={index} messages={messages} />);

    //       botRes.length = [];
    //     }

    //     replies.push(<Message key={index} message={message} />);
    //   } else {
    //     botRes.push(message.text);
    //   }
    // });

    // return replies;

    return messages.map((message, index) => {
      return <Message key={index} message={message} />;
    });
  };

  return (
    <>
      <div style={{ marginTop: "-20px" }}>
        <Container className="container">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "92vh",
            }}
          >
            <Box
              sx={{ overflow: "hidden", position: "relative", p: 2, flex: 1 }}
            >
              <div
                style={{
                  height: "80%",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                {renderMessages()}
                <div ref={messagesEndRef}></div>
              </div>
            </Box>

            <Box
              sx={{
                p: 2,
                backgroundColor: "white",
                position: "sticky",
                bottom: 0,
              }}
            >
              <form onSubmit={handleSend}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type a message"
                      variant="outlined"
                      value={input}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      fullWidth
                      size="large"
                      color="primary"
                      variant="contained"
                      endIcon={<SendIcon />}
                      type="submit"
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

const Message = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: message.isUser ? "secondary.50" : "primary.50",
          borderColor: message.isUser ? "secondary.50" : "primary.50",
          borderRadius: message.isUser
            ? "20px 20px 5px 20px"
            : "20px 20px 20px 5px",
        }}
      >
        <Typography>{message.text}</Typography>
      </Paper>
    </Box>
  );
};

const BotMessage = ({ messages }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: "primary.50",
          borderColor: "primary.50",
          borderRadius: "20px 20px 20px 5px",
        }}
      >
        {messages.map((el, i) => (
          <Typography key={i}>{el}</Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default Chatbot;
