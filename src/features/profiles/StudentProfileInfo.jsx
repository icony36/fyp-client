import React from "react";
import Paper from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { Info } from "../../ui/Info";
import styled, { css } from "styled-components";

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
`;

const TimetableCell = styled.div`
  padding: 16px 40px;
  flex: 1;
  font-size: 15px;
`;

const StudentProfileInfo = ({ data }) => {
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

        <FormGroup>
          <Info label="Timetable">
            <TimetableContainer>
              <TimetableRow header="true">
                {header.map((el) => (
                  <TimetableHeaderCell key={el}>{el}</TimetableHeaderCell>
                ))}
              </TimetableRow>

              {data?.timetable?.map((el, index) => (
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
              ))}
            </TimetableContainer>
          </Info>
        </FormGroup>
      </Paper>
    </>
  );
};

export default StudentProfileInfo;
