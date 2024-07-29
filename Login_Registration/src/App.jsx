import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/Signin";
import { BrowserRouter } from "react-router-dom";

function App() {
 

  return (
    <BrowserRouter>
      <Signin />
    </BrowserRouter>
  )
}

export default App;
