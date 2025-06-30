import { useState } from "react";
import icon from "../../assets/icon.png";
import { Box, Typography, Input, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../../Pages/Auth/authSlice";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { useLoginMutation } from "../../Pages/Auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Pages/Auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState<Boolean>(false);

  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  const options = [
    { label: "All Books", value: "all-books", link: "/" },
    { label: "Your Books", value: "home", link: "/your-book" },
  ];

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...result }));
      setOpenDrawer(false);
      navigate("/your-book");
    } catch (err) {
      console.log("HAIIII");
    }
  };

  const token = useSelector(selectCurrentToken);

  const handleRoute = (link: string) => {
    if (!token) {
      setOpenDrawer(true);
      return;
    }
    navigate(link);
  };

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
            Please Login to Continue
          </Typography>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your username"
            sx={{ marginBottom: 2, width: "100%" }}
          />

          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            sx={{ marginBottom: 2, width: "100%" }}
          />

          <Button
            disabled={email !== "" && password !== "" ? false : true}
            onClick={handleLogin}
            variant="contained"
            color="primary"
          >
            <Typography variant="caption">Sign In</Typography>
          </Button>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="caption">Dont Have An Account?</Typography>
            <Button
              disabled={email !== "" && password !== "" ? false : true}
              variant="contained"
              color="primary"
            >
              <Typography variant="caption">Sign Up</Typography>
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
        <img src={icon} alt="icon" width={50}></img>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          BOOK MANAGER
        </Typography>
      </Box>

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
                backgroundColor: "black", // or your theme color
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
    </Box>
  );
};

export default Header;
