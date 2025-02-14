import {
  Container,
  TextField,
  Button,
  Box,
  Link,
  Typography,
} from "@mui/material";

export default function SignupPage() {
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
        >
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            required
            type="email"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            required
            type="password"
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
            Sign Up
          </Button>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account? <Link href="/auth/signin">Sign In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
