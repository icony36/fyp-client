import React, { useState, useContext } from "react";

import { Paper, FormControl, TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { AuthContext } from "../../contexts";

import { useCreateTicket } from "./useCreateTicket";

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
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Create New Ticket</h1>
            <div>
              <FormControl sx={{ width: "100ch" }} margin="normal">
                <TextField
                  id="subject"
                  name="subject"
                  label="Subject"
                  variant="outlined"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ width: "100ch" }} margin="normal">
                <TextareaAutosize
                  id="detail"
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  required
                  minRows={20}
                  placeholder="Details *"
                />
              </FormControl>
            </div>

            <div style={{ marginTop: "12px" }}>
              <Button
                disabled={isCreating}
                variant="contained"
                size="large"
                type="submit"
              >
                Create Ticket
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default TicketNewForm;
