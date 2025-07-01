import { useState } from "react";
import icon from "../../assets/icon.png";
import {
  Box,
  Typography,
  Input,
  Button,
  Drawer,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken, setCredentials } from "../../Pages/Auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../Pages/Auth/authApiSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // new
  const [isSignupMode, setIsSignupMode] = useState<boolean>(false); // toggle mode
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const token = useSelector(selectCurrentToken);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...result }));
      setOpenDrawer(false);
      setSnackbarMessage("Logged in successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/your-book");
    } catch (err) {
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSignup = async () => {
    try {
      const result = await register({ email, password, username }).unwrap();
      dispatch(setCredentials({ ...result }));
      setOpenDrawer(false);
      setSnackbarMessage("Successfully registered! Please login.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsSignupMode(false); // Switch to login mode
    } catch (err) {
      setSnackbarMessage("Registration failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleRoute = (link: string) => {
    if (!token) {
      setOpenDrawer(true);
      return;
    }
    navigate(link);
  };

  const options = [
    { label: "All Books", value: "all-books", link: "/" },
    { label: "Your Books", value: "home", link: "/your-book" },
  ];

  const isFormValid =
    email !== "" && password !== "" && (isSignupMode ? username !== "" : true);

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Drawer for Login/Register */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {isSignupMode ? "Sign Up" : "Login to Continue"}
          </Typography>

          {isSignupMode && (
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              sx={{ marginBottom: 2, width: "100%" }}
            />
          )}

          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            sx={{ marginBottom: 2, width: "100%" }}
          />

          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            sx={{ marginBottom: 2, width: "100%" }}
          />

          <Button
            disabled={!isFormValid}
            onClick={isSignupMode ? handleSignup : handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            <Typography variant="caption">
              {isSignupMode ? "Sign Up" : "Sign In"}
            </Typography>
          </Button>

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="caption" sx={{ mr: 1 }}>
              {isSignupMode
                ? "Already have an account?"
                : "Don't have an account?"}
            </Typography>
            <Button
              variant="text"
              onClick={() => setIsSignupMode(!isSignupMode)}
              size="small"
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {isSignupMode ? "Login" : "Sign Up"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Logo and title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
        <img src={icon} alt="icon" width={50} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BOOK MANAGER
        </Typography>
      </Box>

      {/* Navigation links */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 5, mr: 2 }}>
        {options.map((option) => (
          <Typography
            onClick={() => handleRoute(option.link)}
            key={option.value}
            variant="body1"
            sx={{
              position: "relative",
              cursor: "pointer",
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                left: 0,
                bottom: -2,
                backgroundColor: "black",
                transition: "width 0.3s ease-in-out",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            {option.label}
          </Typography>
        ))}
      </Box>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Header;
