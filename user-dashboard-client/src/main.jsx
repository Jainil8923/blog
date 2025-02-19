import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
// import { AuthContext } from "./context/AuthContext.js";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#202020",
    },
    secondary: {
      main: "#808080",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthContext.Provider> */}
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    {/* </AuthContext.Provider> */}
  </StrictMode>,
);

