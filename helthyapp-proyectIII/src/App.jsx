import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipesDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/recipes/:id" element={<RecipeDetails />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
