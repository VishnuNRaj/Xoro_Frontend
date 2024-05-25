import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRouter";
import UserRoutes from "./routes/UserRouter";
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <Router>
      <Toaster />
      <AdminRoutes />
      <UserRoutes />
    </Router>
  );
}

export default App;
