import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../Stores/userStore";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";

export default function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const resetPass = userStore((state) => state.resetPass);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    newOne: "",
    reNewOne: "",
  });
  const [password, setPassword] = useState({
    newOne: "",
    reNewOne: "",
  });

  const changeData = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      newOne: "",
      reNewOne: "",
    };
    let isValid = true;

    if (password.newOne.length < 6) {
      newErrors.newOne = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password.reNewOne !== password.newOne) {
      newErrors.reNewOne = "Passwords don't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await resetPass(params.token, password);
      if (response.data.success) {
        alert.success("Password has been reset successfully");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      alert.error("An error occurred. The reset link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
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
            Reset Password
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Please create a new password for your account
          </Typography>

          <form onSubmit={changePassword}>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="New Password"
              variant="outlined"
              required
              name="newOne"
              value={password.newOne}
              onChange={changeData}
              error={!!errors.newOne}
              helperText={errors.newOne}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm New Password"
              variant="outlined"
              required
              name="reNewOne"
              value={password.reNewOne}
              onChange={changeData}
              error={!!errors.reNewOne}
              helperText={errors.reNewOne}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
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
              startIcon={loading ? null : <LockResetIcon />}
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
                "Reset Password"
              )}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
