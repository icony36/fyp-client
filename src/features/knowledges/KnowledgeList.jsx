import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import ListActions from "../../components/ListActions";
import { useFetchKnowledges } from "./useFetchKnowledges";
import { List, ListCell, ListRow } from "../../ui/List";
import { OutlinedChip, ChipStack } from "../../ui/Chip";

const header = ["Title", "Date Created", "Last Modified", "Tags"];

const KnowledgeList = () => {
  const navigate = useNavigate();

  const { knowledges, isFetching, knowledgesStatus } = useFetchKnowledges();

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (knowledgesStatus === "success") {
      setSearchOptions(knowledges.data);
    }
  }, [knowledgesStatus, knowledges]);

  const renderLabels = (labels) => {
    return (
      <>
        <ChipStack sx={{ maxWidth: "500px" }}>
          {labels.map((label, index) => {
            let marginRight = "";

            if (index !== labels.length - 1) {
              marginRight = "8px";
            }

            return (
              <OutlinedChip key={index} style={{ marginRight }}>
                {label}
              </OutlinedChip>
            );
          })}
        </ChipStack>
      </>
    );
  };

  const renderRow = (el) => {
    return (
      <ListRow
        sx={{ cursor: "pointer" }}
        key={el._id}
        hover
        onClick={() => navigate(`/knowledges/${el._id}`)}
      >
        <ListCell>{el.title}</ListCell>
        <ListCell>{format(new Date(el.createdAt), "dd/MM/yyyy")}</ListCell>
        <ListCell>{format(new Date(el.updatedAt), "dd/MM/yyyy")}</ListCell>
        <ListCell>{renderLabels(el.labels)}</ListCell>
      </ListRow>
    );
  };

  return (
    <>
      <ListActions
        options={searchOptions}
        isLoading={isFetching}
        handleSearchClicked={(id) => navigate(`/knowledges/${id}`)}
        handleButtonClicked={() => navigate("/knowledges/new")}
        buttonLabel="Create Knowledge"
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        title="Knowledge Bases"
      />

      <List
        header={header}
        data={knowledges?.data}
        dataStatus={knowledgesStatus}
        isFetching={isFetching}
        notFoundMessage="No knowledge available"
        renderRow={renderRow}
      />
    </>
  );
};

export default KnowledgeList;
