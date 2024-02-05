import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AuthContext } from "../../contexts";
import { useToast } from "../../hooks/useToast";
import { useFetchTickets } from "./useFetchTickets";
import { useEditTicket } from "./useEditTicket";
import { useDeleteTicket } from "./useDeleteTicket";
import { getFullName, sortByNewest, compareName } from "../../utils/helpers";
import {
  ROLE,
  TICKET_TYPE,
  TICKET_STATUS,
  TICKET_PRIORITY,
} from "../../constants";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper, {
  ContentContainer,
  PaperContainer,
  TitleContainer,
  Title,
} from "../../ui/Paper";
import { Heading } from "../../ui/Typography";
import { TextAreaInput } from "../../ui/Input";
import { FormGroup } from "../../ui/FormGroup";
import { Modal } from "../../ui/Modal";
import {
  CardContainer,
  CardContentContainer,
  CardSubtitleContainer,
} from "../../ui/Card";
import { Radio } from "../../ui/Radio";

const priorityOptions = [
  { value: TICKET_PRIORITY.low, label: "Low" },
  { value: TICKET_PRIORITY.medium, label: "Medium" },
  { value: TICKET_PRIORITY.high, label: "High" },
];

const typeOptions = [
  { value: TICKET_TYPE.open, label: "Open" },
  { value: TICKET_TYPE.close, label: "Closed" },
];

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
    priority: "",
    status: "",
    responses: [],
  });
  const [message, setMessage] = useState("");
  const [initModalState, setInitModalState] = useState({
    type: TICKET_TYPE.open,
    priority: TICKET_PRIORITY.low,
  });

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
        priority: ticketData.priority,
        status: ticketData.status,
        responses: ticketData.responses,
      }));

      setInitModalState({
        type: ticketData.type,
        priority: ticketData.priority,
      });
    }
  }, [ticketsStatus, tickets, id, navigate]);

  const handleChangePriority = (event) => {
    setTicketInfo((prevState) => ({
      ...prevState,
      priority: event.target.value,
    }));
  };

  const handleChangeType = (event) => {
    setTicketInfo((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleSaveChanges = () => {
    const toSubmit = {
      type: ticketInfo.type,
      priority: ticketInfo.priority,
    };

    editTicket({ ticketData: toSubmit, id });

    setOpenModal(false);
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

  const handleResetModal = () => {
    setTicketInfo((prevState) => ({
      ...prevState,
      ...initModalState,
    }));
  };

  const handleDelete = () => {
    deleteTicket(id);
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
                  {compareName(
                    el.senderId?.firstName,
                    auth.firstName,
                    el.senderId?.lastName,
                    auth.lastName
                  )
                    ? "You"
                    : getFullName(
                        el.senderId?.firstName,
                        el.senderId?.lastName
                      )}
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
              <Title>Write a Response</Title>
            </TitleContainer>
            <ContentContainer>
              <TextAreaInput
                containerProps={{ style: { marginBottom: "20px" } }}
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Response"
              />

              <Button disabled={isWorking} outlined="true" type="submit">
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
          <Button primary="true" onClick={() => setOpenModal(true)}>
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
            <Title key={"title"}>Past Responses</Title>
          </TitleContainer>
          <ContentContainer>{renderResponses()}</ContentContainer>
        </PaperContainer>
        {renderResponseForm()}
      </FormGroup>
      <Modal openModal={openModal}>
        <CardContainer style={{ margin: 0, height: "100%", minWidth: "780px" }}>
          <CardSubtitleContainer>Prority</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={priorityOptions}
              onChange={handleChangePriority}
              value={ticketInfo.priority}
            />
          </CardContentContainer>
          <CardSubtitleContainer>Status</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={typeOptions}
              onChange={handleChangeType}
              value={ticketInfo.type}
            />
          </CardContentContainer>
          <CardContentContainer
            style={{
              display: "flex",
              borderTop: "2px solid var(--color-light-grey)",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <Button
                simple="true"
                onClick={handleResetModal}
                style={{ color: "var(--color-red)" }}
              >
                Reset Changes
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button simple="true" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                simple="true"
                style={{ color: "var(--color-primary)" }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </CardContentContainer>
        </CardContainer>
      </Modal>
    </>
  );
};

export default TicketInfo;
