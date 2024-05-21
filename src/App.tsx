import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRouter";
import UserRoutes from "./routes/UserRouter";


function App() {
  

  return (
    <Router>
      <AdminRoutes />
      <UserRoutes />
    </Router>
  );
}

export default App;
