import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRouter";
import UserRoutes from "./routes/UserRouter";
import { Toaster } from "react-hot-toast";
import Progressbar from "./Assets/Components/Progressbar";


function App() {

  return (
    <Router>
      <Toaster />
      <Progressbar/>
      <AdminRoutes />
      <UserRoutes />
    </Router>
  );
}

export default App;
