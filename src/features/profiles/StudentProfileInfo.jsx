import React, { useState } from "react";
import Paper, {
  ContentContainer,
  PaperContainer,
  Title,
  TitleContainer,
} from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { Info } from "../../ui/Info";
import styled, { css } from "styled-components";
import { IconButton } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const header = ["Module", "Module Name", "Lesson", "Location", "Date", "Time"];

const TimetableContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  border: 2px solid var(--color-primary);
`;

const TimetableRow = styled.div`
  display: flex;
  border-bottom: 2px solid var(--color-light-grey);

  ${({ header }) =>
    header &&
    css`
      border-bottom: 2px solid var(--color-primary);
    `}

  ${({ noborder }) =>
    noborder &&
    css`
      border-bottom: none;
    `}
`;

const TimetableHeaderCell = styled.div`
  padding: 16px 40px;
  flex: 1;
  min-width: max-content;
  font-size: 20px;
  background-color: var(--color-primary);
  color: white;
  font-weight: 600;
`;

const TimetableCell = styled.div`
  padding: 16px 40px;
  flex: 1;
  font-size: 15px;
`;

const StudentProfileInfo = ({ data }) => {
  const [showTimetable, setShowTimetable] = useState(false);

  const renderTimetable = (timetable) => {
    if (!timetable) {
      return (
        <TimetableRow>
          <TimetableCell>No timetable available</TimetableCell>
        </TimetableRow>
      );
    }

    let arr = [];

    if (showTimetable) {
      arr = [...timetable];
    } else {
      for (let i = 0; i < 2; i++) {
        arr.push(timetable[i]);
      }
    }

    return arr.map((el, index) => (
      <TimetableRow
        key={index}
        noborder={index === data.timetable.length - 1 ? 1 : undefined}
      >
        <TimetableCell>{el.moduleId}</TimetableCell>
        <TimetableCell>{el.moduleName}</TimetableCell>
        <TimetableCell>{el.lessonType}</TimetableCell>
        <TimetableCell>{el.location}</TimetableCell>
        <TimetableCell>{el.date}</TimetableCell>
        <TimetableCell>{el.time}</TimetableCell>
      </TimetableRow>
    ));
  };

  return (
    <>
      <Paper title="Student Profile">
        <FormGroup style={{ marginBottom: "20px" }}>
          <Info label="Course">{data?.course}</Info>
        </FormGroup>

        <FormGroup style={{ marginBottom: "20px" }}>
          <Info label="Outstanding Fee">$ {data?.outstandingFee}</Info>
          <Info label="Enrolled Modules">
            {data?.enrollments?.map((el, index) => {
              if (index !== data.enrollments.length - 1) {
                return `${el}, `;
              }

              return el;
            })}
          </Info>
        </FormGroup>
      </Paper>

      <PaperContainer>
        <TitleContainer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Title>Timetable</Title>
          <IconButton
            sx={{ color: "black" }}
            onClick={() => setShowTimetable(!showTimetable)}
          >
            {showTimetable ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TitleContainer>

        <ContentContainer>
          <TimetableContainer>
            <TimetableRow header="true">
              {header.map((el) => (
                <TimetableHeaderCell key={el}>{el}</TimetableHeaderCell>
              ))}
            </TimetableRow>

            {renderTimetable(data?.timetable)}
            {!showTimetable && (
              <TimetableRow noborder="true">
                <TimetableCell style={{ textAlign: "center", fontWeight: 600 }}>
                  ...
                </TimetableCell>
              </TimetableRow>
            )}
          </TimetableContainer>
        </ContentContainer>
      </PaperContainer>
    </>
  );
};

export default StudentProfileInfo;
