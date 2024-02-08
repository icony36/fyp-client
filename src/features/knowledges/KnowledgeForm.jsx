import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useToast } from "../../hooks/useToast";
import { useFetchKnowledges } from "./useFetchKnowledges";
import { useCreateKnowledge } from "./useCreateKnowledge";
import { useEditKnowledge } from "./useEditKnowledge";
import { useDeleteKnowledge } from "./useDeleteKnowledge";
import HeadingBar from "../../components/HeadingBar";
import { Button, CancelButton } from "../../ui/Button";
import { AddInput, Input, TextAreaInput } from "../../ui/Input";
import Paper from "../../ui/Paper";
import { ChipStack, ChipWithDelete } from "../../ui/Chip";

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
  }, [knowledgesStatus, knowledges, id, isEditSession]);

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
      <form className="register-form" onSubmit={handleSubmit}>
        <HeadingBar
          title={isEditSession ? "Edit Knowledge" : "Create New Knowledge"}
          backLink={isEditSession ? `/knowledges/${id}` : "/knowledges"}
          checkBack
        >
          <Button disabled={isWorking} primary="true" type="submit">
            {isEditSession ? "Save Changes" : "Create"}
          </Button>

          <CancelButton />
        </HeadingBar>

        <Paper title="Knowledge Base Details">
          <Input
            id="title"
            name="title"
            label="Title *"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Paper>

        <Paper title="Knowledge Base Information">
          <TextAreaInput
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            label="Description *"
            placeholder="Description"
            style={{ marginBottom: "20px" }}
          />

          <AddInput
            id="labels"
            label="Tags *"
            name="labels"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            handleAdd={handleAddLabel}
          />

          <ChipStack>
            {formData.labels?.map((el, index) => (
              <ChipWithDelete
                label={el}
                onDelete={() => handleRemoveLabel(el)}
                style={{ marginRight: "8px", fontSize: "14px" }}
                key={index}
              />
            ))}
          </ChipStack>
        </Paper>
      </form>
    </>
  );
};

export default KnowledgeForm;
