import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Card, CardContent, Button, Toolbar } from "@mui/material";

import { AuthContext } from "../../contexts";
import TicketList from "./TicketList";
// import { useFetchProfile } from "./useFetchProfile";

const StudentTicketInfo = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // const { profile, isFetching } = useFetchProfile({
  //   id: auth.id,
  // });

  return (
    <>
      <div className="form-page">
        <Card className="paper" sx={{ minWidth: 860 }}>
          <CardContent>
            <h1>Tickets</h1>

            <TicketList isStudentSession />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentTicketInfo;
