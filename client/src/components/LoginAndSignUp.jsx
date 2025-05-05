import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Avatar,
  FormHelperText,
  Divider,
  CircularProgress,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LockIcon from "@mui/icons-material/Lock";
import userStore from "../Stores/userStore";
import "./LoginAndSignUP.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useAlert } from "react-alert";

export default function LoginAndSignUp() {
  const alert = useAlert();
  const [loginEmail, setLoginEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/avatar.jpg");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formErrors, setFormErrors] = useState({
    loginEmail: "",
    loginPassword: "",
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const location = useLocation();

  const loginUser = userStore((state) => state.loginUser);
  const registerUser = userStore((state) => state.registerUser);
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLoginForm = () => {
    let isValid = true;
    const errors = { loginEmail: "", loginPassword: "" };

    if (!loginEmail) {
      errors.loginEmail = "Email is required";
      isValid = false;
    } else if (!validateEmail(loginEmail)) {
      errors.loginEmail = "Please enter a valid email";
      isValid = false;
    }

    if (!loginPassword) {
      errors.loginPassword = "Password is required";
      isValid = false;
    }

    setFormErrors({ ...formErrors, ...errors });
    return isValid;
  };

  const validateRegisterForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", password: "", avatar: "" };

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!avatar) {
      errors.avatar = "Please select an avatar";
      isValid = false;
    }

    setFormErrors({ ...formErrors, ...errors });
    return isValid;
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setLocalLoading(true);
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    try {
      const data = await registerUser(myForm);
      if (data.status === 200) {
        alert.success("Registered Successfully");
        setLocalLoading(false);
      } else if (
        data.response?.data?.message ===
        "User validation failed: email: Please enter a valid email"
      ) {
        alert.error("Please enter a valid email!");
        setLocalLoading(false);
      } else {
        alert.error("Registration failed. Please try again.");
        setLocalLoading(false);
      }
    } catch (error) {
      alert.error("An error occurred. Please try again.");
      setLocalLoading(false);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setLocalLoading(true);
    try {
      const data = await loginUser(loginEmail, loginPassword);
      if (data.status === 200) {
        alert.success("Login Successful");
        setLocalLoading(false);
      } else if (data.response?.status === 400) {
        alert.error("Invalid email or password");
        setLocalLoading(false);
      } else {
        alert.error("Login failed. Please try again.");
        setLocalLoading(false);
      }
    } catch (error) {
      alert.error("An error occurred. Please try again.");
      setLocalLoading(false);
    }
  };

  const changeFormData = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      if (!file) return;

      // Reset the error
      setFormErrors({ ...formErrors, avatar: "" });

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the error for the field being changed
      setFormErrors({ ...formErrors, [e.target.name]: "" });
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/" + redirect);
    }
  }, [isAuthenticated, navigate, redirect]);

  if (loading) return <Loader />;

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "90vh",
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
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* Tab Header */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="login register tabs"
          >
            <Tab
              label={
                <Typography variant="body1" sx={{ fontWeight: 600, py: 1.5 }}>
                  Login
                </Typography>
              }
            />
            <Tab
              label={
                <Typography variant="body1" sx={{ fontWeight: 600, py: 1.5 }}>
                  Register
                </Typography>
              }
            />
          </Tabs>
        </Box>

        {/* Login Form */}
        <Box
          className={`login-content ${
            activeTab === 0 ? "active-form" : "inactive-form"
          }`}
          sx={{
            p: { xs: 3, sm: 4 },
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
          >
            Welcome Back
          </Typography>

          <form onSubmit={loginSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setFormErrors({ ...formErrors, loginEmail: "" });
                }}
                error={!!formErrors.loginEmail}
                helperText={formErrors.loginEmail}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                fullWidth
                required
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setFormErrors({ ...formErrors, loginPassword: "" });
                }}
                error={!!formErrors.loginPassword}
                helperText={formErrors.loginPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
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
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Link
                to="/forgotPassword"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "0.875rem",
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
              disabled={localLoading}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
              }}
            >
              {localLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ py: 1 }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
                sx={{ py: 1 }}
              >
                Facebook
              </Button>
            </Box>
          </form>
        </Box>

        {/* Register Form */}
        <Box
          className={`register-content ${
            activeTab === 1 ? "active-form" : "inactive-form"
          }`}
          sx={{
            p: { xs: 3, sm: 4 },
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 600, textAlign: "center" }}
          >
            Create Account
          </Typography>

          <form onSubmit={registerSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={name}
                onChange={changeFormData}
                error={!!formErrors.name}
                helperText={formErrors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={email}
                onChange={changeFormData}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                type={showRegisterPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                fullWidth
                required
                name="password"
                value={password}
                onChange={changeFormData}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                        edge="end"
                      >
                        {showRegisterPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Profile Picture
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  src={avatarPreview}
                  alt="Avatar Preview"
                  sx={{
                    width: 64,
                    height: 64,
                    border: "2px solid #1976d2",
                  }}
                />

                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ flexGrow: 1 }}
                >
                  Upload
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={changeFormData}
                    hidden
                  />
                </Button>
              </Box>
              {formErrors.avatar && (
                <FormHelperText error>{formErrors.avatar}</FormHelperText>
              )}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
              disabled={localLoading}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                mb: 2,
              }}
            >
              {localLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              By signing up, you agree to our{" "}
              <Link to="#" style={{ color: "#1976d2", textDecoration: "none" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" style={{ color: "#1976d2", textDecoration: "none" }}>
                Privacy Policy
              </Link>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
