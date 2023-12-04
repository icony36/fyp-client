import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";

import { AuthContext } from "../../contexts";
import { useFetchStudentProfile } from "./useFetchStudentProfile";

const StudentProfileInfo = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { studentProfile, isFetching } = useFetchStudentProfile({
    id: auth.id,
  });

  return (
    <>
      <div className="form-page">
        <Card className="paper" sx={{ minWidth: 720 }}>
          <CardContent>
            <h1>Student Profile</h1>
            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Course :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {studentProfile?.data?.course}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Outstanding Fee :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {`$ ${studentProfile?.data?.outstandingFee}`}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Enrollments :
              </Typography>

              <Stack
                sx={{
                  margin: "8px 0",
                }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                spacing={1}
              >
                {studentProfile?.data?.enrollments?.map((el, index) => {
                  return <Chip key={index} label={el} />;
                })}
              </Stack>
            </div>

            <div
              className="profile-group"
              style={{ marginTop: "40px", justifyContent: "center" }}
            >
              <Button
                disabled={isFetching}
                variant="contained"
                size="small"
                onClick={() => navigate(`/profile/student/edit`)}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StudentProfileInfo;
