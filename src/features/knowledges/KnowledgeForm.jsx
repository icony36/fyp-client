import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Paper,
  FormControl,
  TextField,
  Button,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { AddCircle } from "@mui/icons-material";

import { useToast } from "../../hooks/useToast";
import { useFetchKnowledges } from "./useFetchKnowledges";
import { useCreateKnowledge } from "./useCreateKnowledge";
import { useEditKnowledge } from "./useEditKnowledge";
import { useDeleteKnowledge } from "./useDeleteKnowledge";

const KnowledgeForm = ({ isEditSession }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { knowledges, knowledgesStatus, isFetching } = useFetchKnowledges({
    enabled: isEditSession ? true : false,
  });
  const { createKnowledge, isCreating } = useCreateKnowledge({
    onSuccess: () => setFormData(defaultValues),
  });
  const { editKnowledge, isEditing } = useEditKnowledge();
  const { deleteKnowledge, isDeleting } = useDeleteKnowledge({
    onSuccess: () => navigate("/knowledges"),
  });

  const isWorking = isFetching || isCreating || isEditing || isDeleting;

  const defaultValues = {
    title: "",
    description: "",
    labels: [],
  };

  const [formData, setFormData] = useState(defaultValues);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (isEditSession && knowledgesStatus === "success") {
      const knowledgeData = knowledges.data?.filter((el) => el._id === id)[0];

      if (!knowledgeData) {
        navigate("/knowledges");
        toast.error("Knowledge doesn't exist");
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        title: knowledgeData.title,
        description: knowledgeData.description,
        labels: knowledgeData.labels,
      }));
    }
  }, [knowledgesStatus, knowledges]);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    if (isEditSession) {
      editKnowledge({ knowledgeData: formData, id });
    } else {
      createKnowledge(formData);
    }
  };

  const handleAddLabel = () => {
    if (!label) return;

    setFormData((prevState) => ({
      ...prevState,
      labels: [...prevState.labels, label],
    }));

    setLabel("");
  };

  const handleRemoveLabel = (data) => {
    const arr = formData.labels;
    const index = arr.indexOf(data);
    arr.splice(index, 1);

    setFormData((prevState) => ({
      ...prevState,
      labels: arr,
    }));
  };

  return (
    <>
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>{isEditSession ? "Edit Knowledge" : "Create New Knowledge"}</h1>
            <div>
              <FormControl sx={{ width: "100ch" }} margin="normal">
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                width: "100ch",
                margin: "auto",
              }}
            >
              <FormControl sx={{ flex: 1 }} margin="normal">
                <TextField
                  id="labels"
                  label="Labels*"
                  variant="outlined"
                  name="labels"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <IconButton size="large" onClick={handleAddLabel}>
                  <AddCircle fontSize="40" />
                </IconButton>
              </FormControl>
            </div>

            <div>
              <Stack
                margin="normal"
                direction="row"
                useFlexGap
                flexWrap="wrap"
                spacing={1}
              >
                {formData.labels.map((el, index) => {
                  return (
                    <Chip
                      onDelete={() => handleRemoveLabel(el)}
                      key={index}
                      label={el}
                    />
                  );
                })}
              </Stack>
            </div>

            <div>
              <FormControl sx={{ width: "100ch" }} margin="normal">
                <TextareaAutosize
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minRows={20}
                  placeholder="Description *"
                />
              </FormControl>
            </div>

            <div style={{ marginTop: "12px" }}>
              {isEditSession ? (
                <Button
                  disabled={isWorking}
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ marginRight: "8px" }}
                  onClick={() => deleteKnowledge(id)}
                >
                  Delete Knowledge
                </Button>
              ) : (
                <></>
              )}

              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                type="submit"
              >
                {isEditSession ? "Update Knowledge" : "Create Knowledge"}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default KnowledgeForm;
