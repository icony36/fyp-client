import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useToast } from "../../hooks/useToast";
import { useFetchKnowledges } from "./useFetchKnowledges";
import { useDeleteKnowledge } from "./useDeleteKnowledge";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper, { Title } from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { Info } from "../../ui/Info";
import { TitleContainer } from "../../ui/Paper";
import { Heading } from "../../ui/Typography";
import { ChipStack, OutlinedChip } from "../../ui/Chip";

const KnowledgeInfo = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { knowledges, knowledgesStatus, isFetching } = useFetchKnowledges({});
  const { deleteKnowledge, isDeleting } = useDeleteKnowledge({
    onSuccess: () => navigate("/knowledges"),
  });

  const isWorking = isFetching || isDeleting;

  const [knowledge, setKnowledge] = useState({
    title: "",
    description: "",
    labels: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (knowledgesStatus === "success") {
      const knowledgeData = knowledges.data?.filter((el) => el._id === id)[0];

      if (!knowledgeData) {
        navigate("/knowledges");
        toast.error("Knowledge doesn't exist");
        return;
      }

      setKnowledge((prevState) => ({
        title: knowledgeData.title,
        description: knowledgeData.description,
        labels: knowledgeData.labels,
        createdAt: knowledgeData.createdAt,
        updatedAt: knowledgeData.updatedAt,
      }));
    }
  }, [knowledgesStatus, knowledges]);

  return (
    <>
      <HeadingBar title="View Knowledge" backLink={"/knowledges"}>
        <Button
          primary
          disabled={isWorking}
          onClick={() => navigate(`/knowledges/${id}/edit`)}
        >
          Edit
        </Button>

        <Button
          outlined
          style={{ marginLeft: "16px" }}
          disabled={isWorking}
          onClick={() => deleteKnowledge(id)}
        >
          Delete
        </Button>
      </HeadingBar>

      <Paper title="Knowledge Base Details">
        <FormGroup style={{ justifyContent: "flex-start" }}>
          <div style={{ flex: 0.6 }}>
            <Title>Title</Title>
            <Heading as="h3">{knowledge?.title}</Heading>
          </div>

          <div
            style={{
              display: "flex",
              flex: 0.4,
            }}
          >
            <div
              style={{
                flex: 0.5,
              }}
            >
              <Title>Date Created</Title>
              <Heading as="h3">
                {format(new Date(knowledge?.createdAt), "dd/MM/yyyy")}
              </Heading>
            </div>
            <div
              style={{
                flex: 0.5,
              }}
            >
              <Title>Last Modified</Title>
              <Heading as="h3">
                {format(new Date(knowledge?.updatedAt), "dd/MM/yyyy")}
              </Heading>
            </div>
          </div>
        </FormGroup>
      </Paper>

      <Paper title="KnowledgeBase Information">
        <div style={{ marginBottom: "20px" }}>
          <Title>Description</Title>
          <Heading as="h3">{knowledge.description}</Heading>
        </div>

        <Title style={{ marginBottom: "8px" }}>Tags</Title>
        <ChipStack>
          {knowledge?.labels?.map((label, index) => {
            let marginRight = "";

            if (index !== knowledge.labels.length - 1) {
              marginRight = "8px";
            }

            return (
              <OutlinedChip key={index} style={{ marginRight }}>
                {label}
              </OutlinedChip>
            );
          })}
        </ChipStack>
      </Paper>
    </>
  );
};

export default KnowledgeInfo;
