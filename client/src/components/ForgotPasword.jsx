import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { useAlert } from "react-alert";
import React, { useState } from "react";
import userStore from "../Stores/userStore";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ForgotPasword() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const forgot = userStore((state) => state.forgotPassword);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!mail) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(mail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setLoading(true);

    try {
      const response = await forgot(mail);
      if (response.data.success) {
        alert.success("Reset password link sent to your email");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert.error(response.data.message || "Failed to send reset email");
      }
    } catch (error) {
      alert.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            py: 3,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h5"
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
          >
            Forgot Password
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          <form onSubmit={submit}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              variant="outlined"
              value={mail}
              required
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => {
                setMail(e.target.value);
                if (emailError) setEmailError("");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              size="large"
              sx={{
                py: 1.5,
                borderRadius: "8px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                component={Link}
                to="/login"
                startIcon={<ArrowBackIcon />}
                sx={{
                  textTransform: "none",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Back to Login
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
