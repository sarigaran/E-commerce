import React, { useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleGoogleSuccess = (response) => {
    localStorage.setItem("token", response.credential);
    navigate("/");
  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 5, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box display="flex" justifyContent="center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default GoogleLoginForm;
