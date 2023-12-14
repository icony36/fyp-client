import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Card, CardContent, Button } from "@mui/material";

import { AuthContext } from "../../contexts";
import { useFetchProfile } from "./useFetchProfile";

const ProfileInfo = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { profile, isFetching } = useFetchProfile({
    id: auth.id,
  });

  return (
    <>
      <div className="form-page">
        <Card className="paper" sx={{ minWidth: 860 }}>
          <CardContent>
            <h1>Profile</h1>
            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Username :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {profile?.data?.username}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Name :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {`${profile?.data?.firstName ? profile?.data?.firstName : ""} ${
                  profile?.data?.lastName ? profile?.data?.lastName : ""
                }`}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Email :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {profile?.data?.email}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Role :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {profile?.data?.role?.toUpperCase()}
              </Typography>
            </div>

            <div className="profile-group">
              <Typography variant="subtitle1" gutterBottom>
                Status :
              </Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="subtitle1"
                gutterBottom
              >
                {profile?.data?.isSuspended ? "Suspended" : "Active"}
              </Typography>
            </div>

            <div
              className="profile-group"
              style={{ marginTop: "40px", justifyContent: "center" }}
            >
              <Button
                disabled={isFetching}
                variant="contained"
                size="small"
                onClick={() => navigate(`/profile/edit`)}
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

export default ProfileInfo;
