import React, { useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import useUndoable from "use-undoable";

import { Tabs, Tab } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TextForm from "./TextForm";
import FlowEditor from "./FlowEditor";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import { useFetchTrainingData } from "./useFetchTrainingData";
import { useEditTrainingData } from "./useEditTrainingData";

const ContentContainer = styled.div`
  background-color: var(--color-primary-darker);
  border: 4px solid var(--color-primary);
  border-radius: 0 20px 20px 20px;
  min-height: 800px;
`;

const tabs = ["Intents", "Responses", "Flows"];

const nodeOptions = ["Intent", "Response"];

const initIntents = {
  name: "",
  examples: [""],
};

const initResponses = {
  name: "",
  text: [""],
};

const TrainingPanel = () => {
  const { trainingData, isFetching, trainingDataStatus } =
    useFetchTrainingData();

  const { editTrainingData, isEditing } = useEditTrainingData();

  const isWorking = isFetching || isEditing;

  const [tab, setTab] = useState(0);

  const [elements, setElements, { undo, canUndo, redo, canRedo }] = useUndoable(
    { nodes: [], edges: [] },
    {
      behavior: "destroyFuture",
    }
  );

  const [updatedNode, setUpdatedNode] = useState({
    id: "",
    content: { contenType: "", contentValue: "" },
  });

  const [intents, setIntents] = useState([]);

  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (trainingDataStatus === "success") {
      setIntents(trainingData.data?.intents);
      setResponses(trainingData.data?.responses);
      setElements({
        nodes: trainingData.data?.nodes?.map((el) => {
          return {
            ...el,
            data: {
              ...el.data,
              setUpdatedNode,
            },
          };
        }),
        edges: trainingData.data?.edges,
      });
    }
  }, [trainingDataStatus, trainingData]);

  useEffect(() => {
    const { id, content } = updatedNode;

    // set node content data
    setElements((el) => {
      const updatedNodes = el.nodes.map((node) => {
        const newNode = { ...node };

        if (node.id === id) {
          newNode.data = {
            ...newNode.data,
            content,
          };
        }

        return newNode;
      });

      return { ...el, nodes: updatedNodes };
    });
  }, [updatedNode]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSave = () => {
    const toSubmit = {
      intents,
      responses,
      nodes: elements.nodes,
      edges: elements.edges,
    };

    console.log(toSubmit);

    editTrainingData(toSubmit);
  };

  const renderTab = () => {
    switch (tab) {
      case 0:
        return (
          <TextForm
            formData={intents}
            setFormData={setIntents}
            initData={initIntents}
            valueName="examples"
            keyLabel="Intent *"
            keyPlaceholder="Intent Name"
            valueLabel="Example *"
            valuePlaceholder="Example Text"
            addNewGroupLabel="Add Intent"
            addNewValueLabel="Add Example"
          />
        );
      case 1:
        return (
          <TextForm
            formData={responses}
            setFormData={setResponses}
            initData={initResponses}
            valueName="text"
            keyLabel="Response *"
            keyPlaceholder="Response Name"
            valueLabel="Text *"
            valuePlaceholder="Response Text"
            addNewGroupLabel="Add Response"
            addNewValueLabel="Add Text"
          />
        );
      case 2:
        return (
          <ReactFlowProvider>
            <FlowEditor
              nodeOptions={nodeOptions}
              intentOptions={intents}
              responseOptions={responses}
              nodes={elements.nodes}
              edges={elements.edges}
              elements={elements}
              setElements={setElements}
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
              setUpdatedNode={setUpdatedNode}
            />
          </ReactFlowProvider>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div style={{ minWidth: 325, minHeight: 500, padding: "20px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              sx={{
                "& button": {
                  border: "2px solid var(--color-primary)",
                  borderRadius: "20px 20px 0 0",
                  borderBottom: "none",
                  color: "var(--color-primary)",
                  transition: "0.3s",
                  padding: "14px 16px",
                },
                "& button:hover": {
                  backgroundColor: "var(--color-primary) !important",
                  color: "white",
                },
                "& button.Mui-selected": {
                  backgroundColor: "var(--color-primary) !important",
                  color: "white",
                },
              }}
            >
              {tabs.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          </div>

          <Button
            style={{
              height: "52px",
              padding: "16px",
              minWidth: "200px",
              marginBottom: "8px",
            }}
            withicon="true"
            orange="true"
            onClick={handleSave}
            disabled={isWorking}
          >
            Save Changes
            <SaveOutlinedIcon sx={{ width: "30px", height: "30px" }} />
          </Button>
        </div>

        <ContentContainer>{renderTab()}</ContentContainer>
      </div>
    </>
  );
};

export default TrainingPanel;
