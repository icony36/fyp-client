import React, { useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import useUndoable from "use-undoable";
import YAML from "yaml";

import { Tabs, Tab } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TextForm from "./TextForm";
import FlowEditor from "./FlowEditor";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import { useFetchTrainingData } from "./useFetchTrainingData";
import { useEditTrainingData } from "./useEditTrainingData";
import {
  getIntentsArray,
  getIntentsNLU,
  getStoriesArray,
  getResponsesObj,
} from "../../utils/helpers";
import { defaultTraining } from "../../utils/training";
import { useToast } from "../../hooks/useToast";
import { rasaLoadModels, rasaTrain } from "../../services/trainingData";
import { LoadingTyping } from "../../ui/Loading";

const ContentContainer = styled.div`
  background-color: var(--color-primary-darker);
  border: 4px solid var(--color-primary);
  border-radius: 0 20px 20px 20px;
  min-height: 800px;
`;

const tabs = ["Intents", "Responses", "Flows"];

const nodeOptions = ["Intent", "Response"];

const TrainingPanel = () => {
  const { toast } = useToast();

  const { trainingData, isFetching, trainingDataStatus } =
    useFetchTrainingData();

  const { editTrainingData, isEditing } = useEditTrainingData();

  const isWorking = isFetching || isEditing;

  const [tab, setTab] = useState(0);

  const [isTraining, setIsTraining] = useState(false);

  const [elements, setElements, { undo, canUndo, redo, canRedo }] = useUndoable(
    { nodes: [], edges: [] },
    {
      behavior: "keepFuture",
    }
  );

  const [updatedNode, setUpdatedNode] = useState({
    id: "",
    content: { contenType: "", contentValue: "" },
  });

  const [intents, setIntents] = useState([]);

  const [responses, setResponses] = useState([]);

  const [shouldInit, setShouldInit] = useState(true);

  useEffect(() => {
    if (trainingDataStatus === "success" && trainingData.data) {
      setIntents(trainingData.data?.intents);
      setResponses(trainingData.data?.responses);
    }
  }, [trainingDataStatus, trainingData]);

  const initElements = () => {
    if (trainingData && shouldInit) {
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

      setShouldInit(false);
    }
  };

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
    };

    const hasNodes = elements.nodes && elements.nodes.length > 0;
    const hasEdges = elements.edges && elements.edges.length > 0;

    if (hasNodes) {
      toSubmit.nodes = elements.nodes;
    }

    if (hasEdges) {
      toSubmit.edges = elements.edges;
    }

    editTrainingData(toSubmit);

    if (hasNodes && hasEdges) {
      const storiesArr = getStoriesArray(elements.nodes, elements.edges);
      const intentArr = getIntentsArray(intents);
      const intentNLUArr = getIntentsNLU(intents);
      const responseObj = getResponsesObj(responses);
      const trainingObj = {
        pipeline: defaultTraining.pipeline,
        policies: defaultTraining.policies,
        intents: [...defaultTraining.intents],
        entities: defaultTraining.entities,
        slots: defaultTraining.slots,
        actions: defaultTraining.actions,
        forms: defaultTraining.forms,
        e2e_actions: [],
        responses: { ...defaultTraining.responses },
        session_config: defaultTraining.session_config,
        nlu: [...defaultTraining.nlu],
        rules: defaultTraining.rules,
        stories: [...defaultTraining.stories],
      };

      const result = YAML.stringify(trainingObj);

      console.log(result);

      trainBot(result);
    }
  };

  const trainBot = async (ymlData) => {
    try {
      setIsTraining(true);
      // const res = await rasaTrain(ymlData);

      // console.log(res.headers.filename);

      // await rasaLoadModels(res.headers.filename);
      toast.success("Model is trained and loaded.");
      setIsTraining(false);
    } catch (err) {
      setIsTraining(false);
      toast.error("Training Error.");
      console.log(err);
    }
  };

  const renderTab = () => {
    switch (tab) {
      case 0:
        return (
          <TextForm
            formData={intents}
            setFormData={setIntents}
            initData={{
              name: "",
              examples: [""],
            }}
            valueName="examples"
            keyLabel="Intent *"
            keyPlaceholder="Intent Name"
            valueLabel="Example *"
            valuePlaceholder="Example Text"
            addNewGroupLabel="Add Intent"
            addNewValueLabel="Add Example"
            isWorking={isWorking}
          />
        );
      case 1:
        return (
          <TextForm
            formData={responses}
            setFormData={setResponses}
            initData={{
              name: "",
              text: [""],
            }}
            valueName="text"
            keyLabel="Response *"
            keyPlaceholder="Response Name"
            valueLabel="Text *"
            valuePlaceholder="Response Text"
            addNewGroupLabel="Add Response"
            addNewValueLabel="Add Text"
            isWorking={isWorking}
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
              onInit={initElements}
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

          {isTraining ? (
            <div
              style={{
                height: "52px",
                minWidth: "200px",
                marginBottom: "8px",
                borderRadius: "40px",
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "var(--color-light-grey)",
                  marginRight: "30px",
                }}
              >
                Training
              </div>
              <div>
                <LoadingTyping />
              </div>
            </div>
          ) : (
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
              <>
                Save Changes
                <SaveOutlinedIcon sx={{ width: "30px", height: "30px" }} />
              </>
            </Button>
          )}
        </div>
        <ContentContainer>{renderTab()}</ContentContainer>
      </div>
    </>
  );
};

export default TrainingPanel;
