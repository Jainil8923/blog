import { BrowserRouter } from "react-router";
import { routes as Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
export default App;
