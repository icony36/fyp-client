import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Paper, FormControl, TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

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
  };

  const [formData, setFormData] = useState(defaultValues);

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

  return (
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
  );
};

export default KnowledgeForm;
