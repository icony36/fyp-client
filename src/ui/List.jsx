import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export const ListRow = ({ children, sx, ...props }) => {
  return (
    <>
      <TableRow sx={{ ...sx }} {...props}>
        {children}
      </TableRow>
    </>
  );
};

export const ListCell = ({ children, sx, ...props }) => {
  return (
    <>
      <TableCell
        sx={{
          padding: "16px 40px",
          fontSize: "15px",
          fontWeight: "600",
          borderBottom: "none",
          ...sx,
        }}
        {...props}
      >
        {children}
      </TableCell>
    </>
  );
};

export const ListHeaderCell = ({ children, sx, ...props }) => {
  return (
    <>
      <ListCell
        sx={{
          fontFamily: "Playfair Display",
          fontWeight: "600",
          fontSize: "21px",
          borderBottom: "2px solid var(--color-light-grey)",
          ...sx,
        }}
        {...props}
      >
        {children}
      </ListCell>
    </>
  );
};

export const List = ({
  header,
  data,
  isFetching,
  dataStatus,
  notFoundMessage,
  renderRow,
}) => {
  const renderEmptyRows = (colNum, wording) => {
    const arr = [];

    for (let i = 0; i < colNum; i++) {
      if (i === 0) {
        arr.push(<ListCell>{wording}</ListCell>);
      } else {
        arr.push(<ListCell></ListCell>);
      }
    }

    return <ListRow>{arr.map((el) => el)}</ListRow>;
  };

  const renderRows = () => {
    if (isFetching) {
      return renderEmptyRows(header.length, "Loading...");
    }

    if (dataStatus === "error" || !data || data.length < 1) {
      return renderEmptyRows(header.length, notFoundMessage);
    }

    return data.map((el) => renderRow(el));
  };

  return (
    <>
      <TableContainer
        sx={{
          minWidth: 650,
          backgroundColor: "white",
          borderRadius: "20px",
          border: "2px solid #D9D9D9",
          marginBottom: "20px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <ListRow>
              {header.map((header) => (
                <ListHeaderCell key={header}>{header}</ListHeaderCell>
              ))}
            </ListRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
