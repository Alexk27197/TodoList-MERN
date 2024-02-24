import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./utiles/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Homepage />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
