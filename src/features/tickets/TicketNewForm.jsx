import React, { useState, useContext } from "react";

import { FormControl, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { AuthContext } from "../../contexts";

import { useCreateTicket } from "./useCreateTicket";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper from "../../ui/Paper";
import { Input, TextAreaInput } from "../../ui/Input";

const TicketNewForm = () => {
  const { auth } = useContext(AuthContext);

  const { createTicket, isCreating } = useCreateTicket({
    onSuccess: () => setFormData(defaultValues),
  });

  const defaultValues = {
    subject: "",
    detail: "",
  };

  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const toSubmit = {
      ...formData,
      studentId: auth.id,
    };

    createTicket(toSubmit);
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <HeadingBar title="Create Ticket" backLink={"/tickets"}>
          <Button disabled={isCreating} primary type="submit">
            Create
          </Button>
        </HeadingBar>

        <Paper title={"Ticket Details"}>
          <Input
            id="subject"
            name="subject"
            label="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ marginBottom: "20px" }}
          />

          <TextAreaInput
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
            label="Description *"
            placeholder="Description"
          />
        </Paper>
      </form>
    </>
  );
};

export default TicketNewForm;
