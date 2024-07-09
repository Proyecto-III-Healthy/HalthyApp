import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import RecipeDetails from "./pages/RecipesDetails";
import UserForm from "./pages/UserForm";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/edit/:id" element={<UserForm />} />
        <Route path="/calendar" element={<CalendarPage />} />

        <Route path="/recipes/:id" element={<RecipeDetails />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
      </Routes>
    </>
  );
}

export default App;
