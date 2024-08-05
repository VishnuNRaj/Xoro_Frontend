import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRouter";
import UserRoutes from "./routes/UserRouter";
import { Toaster } from "react-hot-toast";
import Progressbar from "./Assets/Components/Progressbar";
import ErrorBoundary from "./routes/ErrorBoundary";

function App() {
  return (
    <Router>
      <Toaster />
      <Progressbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;