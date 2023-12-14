import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, formatDistance } from "date-fns";

import { Paper, FormControl, Typography, Button, Divider } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { AuthContext } from "../../contexts";

import { useToast } from "../../hooks/useToast";
import { useFetchTickets } from "./useFetchTickets";
import { useEditTicket } from "./useEditTicket";
import { useDeleteTicket } from "./useDeleteTicket";
import { sortByNewest, ticketStatusToStr } from "../../utils/helpers";
import { ROLE, TICKET_TYPE, TICKET_STATUS } from "../../constants";

const TicketInfo = () => {
  const { auth } = useContext(AuthContext);

  const isStudentSession = auth.role === ROLE.student;

  const { id } = useParams();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { tickets, isFetching, ticketsStatus } = useFetchTickets({
    isStudentSession,
    studentId: isStudentSession ? auth.id : null,
  });

  const { editTicket, isEditing } = useEditTicket();
  const { deleteTicket, isDeleting } = useDeleteTicket();

  const isWorking = isFetching || isEditing || isDeleting;

  const [ticketInfo, setTicketInfo] = useState({
    subject: "",
    detail: "",
    studentId: {},
    type: "",
    status: "",
    responses: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (ticketsStatus === "success") {
      const ticketData = tickets.data?.filter((el) => el._id === id)[0];

      if (!ticketData) {
        navigate("/tickets");
        toast.error("Ticket doesn't exist");
        return;
      }

      setTicketInfo((prevState) => ({
        ...prevState,
        subject: ticketData.subject,
        detail: ticketData.detail,
        studentId: ticketData.studentId,
        type: ticketData.type,
        status: ticketData.status,
        responses: ticketData.responses,
      }));
    }
  }, [ticketsStatus, tickets]);

  const handleChangeType = () => {
    let toSubmit = {};

    switch (ticketInfo.type) {
      case TICKET_TYPE.open:
        toSubmit = {
          type: TICKET_TYPE.close,
          status: TICKET_STATUS.solved,
        };

        break;
      case TICKET_TYPE.close:
        toSubmit = {
          type: TICKET_TYPE.open,
          status: TICKET_STATUS.pendingStaff,
        };
        break;
      default:
        break;
    }

    editTicket({ ticketData: toSubmit, id });
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const response = {
      message,
      senderType: isStudentSession ? ROLE.student : ROLE.staff,
      senderId: auth.id,
      msgAt: new Date(),
    };

    const toSubmit = {
      status: isStudentSession
        ? TICKET_STATUS.pendingStaff
        : TICKET_STATUS.pendingStudent,
      responses: [...ticketInfo.responses, response],
    };

    editTicket({ ticketData: toSubmit, id });

    setMessage("");
  };

  const renderResponses = () => {
    if (isFetching) {
      return (
        <Typography variant="subtitle1" gutterBottom>
          Loading...
        </Typography>
      );
    }

    if (
      ticketsStatus === "error" ||
      !ticketInfo.responses ||
      ticketInfo.responses.length < 1
    ) {
      return (
        <Typography variant="subtitle1" gutterBottom>
          No response yet
        </Typography>
      );
    }

    const arr = ticketInfo.responses;

    arr.sort((a, b) => sortByNewest(a.msgAt, b.msgAt));

    return arr.map((el, index) => {
      return (
        <>
          <div key={index} style={{ marginBottom: "16px" }}>
            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Time :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {format(new Date(el.msgAt), "yyyy/MM/dd HH:mm")}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Sender :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {el.senderType}
              </Typography>
            </div>

            <div>
              <Typography textAlign={"left"} variant="subtitle1" gutterBottom>
                Reponses :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", textAlign: "left" }}
                variant="subtitle1"
                gutterBottom
              >
                {el.message}
              </Typography>
            </div>

            <Divider sx={{ marginTop: "16px" }} />
          </div>
        </>
      );
    });
  };

  const renderResponseArea = () => {
    if (
      (auth.role === ROLE.staff &&
        ticketInfo.status === TICKET_STATUS.pendingStaff) ||
      (auth.role === ROLE.student &&
        ticketInfo.status === TICKET_STATUS.pendingStudent)
    ) {
      return (
        <>
          <div className="form-page">
            <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
              <form className="register-form" onSubmit={handleSubmit}>
                <div>
                  <Typography
                    textAlign={"left"}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Your response :
                  </Typography>
                  <FormControl sx={{ width: "100ch" }} margin="normal">
                    <TextareaAutosize
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      minRows={20}
                      placeholder="Type something..."
                    />
                  </FormControl>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <Button
                    disabled={isWorking}
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Response
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 860, minHeight: 320 }}>
          <h1>Ticket Info</h1>

          <div className="profile-group">
            <Typography variant="subtitle1" gutterBottom>
              Subject :
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="subtitle1"
              gutterBottom
            >
              {ticketInfo.subject}
            </Typography>
          </div>

          <div className="profile-group">
            <Typography variant="subtitle1" gutterBottom>
              Created by :
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="subtitle1"
              gutterBottom
            >
              {ticketInfo.studentId?.username}
            </Typography>
          </div>

          <div className="profile-group">
            <Typography variant="subtitle1" gutterBottom>
              Type :
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="subtitle1"
              gutterBottom
            >
              {ticketInfo.type?.toUpperCase()}
            </Typography>
          </div>

          <div className="profile-group">
            <Typography variant="subtitle1" gutterBottom>
              Status :
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="subtitle1"
              gutterBottom
            >
              {ticketStatusToStr(ticketInfo.status)}
            </Typography>
          </div>

          <div>
            <Typography textAlign={"left"} variant="subtitle1" gutterBottom>
              Description :
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", textAlign: "left" }}
              variant="subtitle1"
              gutterBottom
            >
              {ticketInfo.detail}
            </Typography>
          </div>

          {isStudentSession ? (
            <></>
          ) : (
            <div style={{ marginTop: "12px" }}>
              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                color="secondary"
                sx={{ marginRight: "8px" }}
                onClick={() => deleteTicket(id)}
              >
                Delete Ticket
              </Button>

              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                sx={{ marginRight: "8px" }}
                onClick={() => handleChangeType()}
              >
                {ticketInfo.type === TICKET_TYPE.close
                  ? "Open Ticket"
                  : "Close Ticket"}
              </Button>
            </div>
          )}
        </Paper>
      </div>

      {renderResponseArea()}

      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 860, minHeight: 100 }}>
          {renderResponses()}
        </Paper>
      </div>
    </>
  );
};

export default TicketInfo;
