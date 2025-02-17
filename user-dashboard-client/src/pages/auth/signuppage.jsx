import {
  Container,
  TextField,
  Button,
  Box,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignupPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password, firstname, lastname);
    const token = localStorage.getItem("token");
    const yourNewData = {
      email,
      password,
      firstname,
      lastname,
    };
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(yourNewData),
    });
    if (response.ok) {
      navigate("/auth/signin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30vh",
        }}
      >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ width: "100%", mt: 1 }}
        onSubmit={handleSubmit}
      >
          <TextField
            fullWidth
            margin="normal"
            label="Firstname"
            variant="outlined"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Lastname"
            variant="outlined"
            required
            onChange={(e) => setlastname(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            type="submit"
          >
            Sign Up
          </Button>
          {error && (
            <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
          )}
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account? <Link href="/auth/signin">Sign In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
