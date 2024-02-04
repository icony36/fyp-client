import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AuthContext } from "../../contexts";
import { useToast } from "../../hooks/useToast";
import { useFetchTickets } from "./useFetchTickets";
import { useEditTicket } from "./useEditTicket";
import { useDeleteTicket } from "./useDeleteTicket";
import { getFullName, sortByNewest } from "../../utils/helpers";
import { ROLE, TICKET_TYPE, TICKET_STATUS } from "../../constants";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper, {
  ContentContainer,
  PaperContainer,
  TitleContainer,
} from "../../ui/Paper";
import { Heading } from "../../ui/Typography";
import { TextAreaInput } from "../../ui/Input";
import { FormGroup } from "../../ui/FormGroup";

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

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (ticketsStatus === "success") {
      const ticketData = tickets.data?.filter((el) => el._id === id)[0];

      if (!ticketData) {
        navigate("/tickets");
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
  }, [ticketsStatus, tickets, id, navigate]);

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
        <Heading as="h3" style={{ textAlign: "center" }}>
          Loading...
        </Heading>
      );
    }

    if (
      ticketsStatus === "error" ||
      !ticketInfo.responses ||
      ticketInfo.responses.length < 1
    ) {
      return (
        <Heading as="h3" style={{ textAlign: "center" }}>
          No response yet
        </Heading>
      );
    }

    const arr = ticketInfo.responses;

    arr.sort((a, b) => sortByNewest(a.msgAt, b.msgAt));

    return arr.map((el, index) => {
      return (
        <>
          <PaperContainer
            key={index}
            style={{
              minWidth: "100%",
              border:
                el.senderType === ROLE.staff
                  ? "2px solid var(--color-primary)"
                  : "2px solid var(--color-light-grey)",
            }}
          >
            <FormGroup
              style={{ padding: "20px 20px 0 20px", alignItems: "flex-start" }}
            >
              <TitleContainer style={{ padding: 0, borderBottom: "none" }}>
                <Heading as="h2" style={{ fontWeight: "600" }}>
                  {getFullName(el.senderId?.firstName, el.senderId?.lastName)}
                </Heading>
              </TitleContainer>

              <Heading as="h4" style={{ fontWeight: "bold" }}>
                {format(new Date(el.msgAt), "dd/MM/yyyy")}
              </Heading>
            </FormGroup>

            <ContentContainer>{el.message}</ContentContainer>
          </PaperContainer>
        </>
      );
    });
  };

  const renderResponseForm = () => {
    return (
      <>
        <PaperContainer style={{ width: "49%" }}>
          <form className="register-form" onSubmit={handleSubmit}>
            <TitleContainer style={{ paddingBottom: 0, borderBottom: "none" }}>
              Write a Response
            </TitleContainer>
            <ContentContainer>
              <TextAreaInput
                containerProps={{ style: { marginBottom: "20px" } }}
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minRows={20}
                placeholder="Response"
              />

              <Button disabled={isWorking} outlined size="large" type="submit">
                Send Response
              </Button>
            </ContentContainer>
          </form>
        </PaperContainer>
      </>
    );
  };

  return (
    <>
      <HeadingBar title="View Ticket" backLink={"/tickets"}>
        {!isStudentSession && (
          <Button primary onClick={() => setOpenModal(true)}>
            Modify Priority & Status
          </Button>
        )}
      </HeadingBar>

      <Paper title="Ticket Details">
        <Heading
          as="h2"
          style={{ marginBottom: "20px" }}
        >{`Subject: ${ticketInfo.subject}`}</Heading>

        <Heading as="h3">{ticketInfo.detail}</Heading>
      </Paper>

      <FormGroup
        style={{ alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <PaperContainer style={{ width: "49%" }}>
          <TitleContainer style={{ paddingBottom: 0, borderBottom: "none" }}>
            Past Responses
          </TitleContainer>
          <ContentContainer>{renderResponses()}</ContentContainer>
        </PaperContainer>
        {renderResponseForm()}
      </FormGroup>
    </>
  );
};

export default TicketInfo;
