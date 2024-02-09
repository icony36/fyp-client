import React, { useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import useUndoable from "use-undoable";

import { Tabs, Tab } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TextForm from "./TextForm";
import FlowEditor from "./FlowEditor";
import { Button } from "../../ui/Button";
import styled from "styled-components";

const ContentContainer = styled.div`
  background-color: var(--color-primary-darker);
  border: 4px solid var(--color-primary);
  border-radius: 0 20px 20px 20px;
  min-height: 800px;
`;

const tabs = ["Intents", "Responses", "Flows"];

const nodeOptions = ["Intent", "Response"];

const initNodes = [];

const initEdges = [];

const TrainingPanel = () => {
  const [tab, setTab] = useState(0);

  const [elements, setElements, { undo, canUndo, redo, canRedo }] = useUndoable(
    { nodes: initNodes, edges: initEdges },
    {
      behavior: "destroyFuture",
    }
  );

  const initIntents = {
    name: "",
    examples: [""],
  };

  const initResponses = {
    name: "",
    text: [""],
  };

  const [intents, setIntents] = useState([initIntents]);

  const [responses, setResponses] = useState([initResponses]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSave = () => {
    console.log("Save:");
    console.log(intents);
    console.log(responses);
    console.log(elements);
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
              setElements={setElements}
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
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
          disableGutters
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
