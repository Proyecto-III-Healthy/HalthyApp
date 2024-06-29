import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { getFavorites } from "../services/RecipesService";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";

const Profile = () => {
  //crear un estado que empieza como array vacio
  //loading
  //useEffect con la peticion

  const [favorites, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then((favoriteDB) => {
        setFavorite(favoriteDB);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Mis Recetas Favoritas</h2>
      {loading ? (
        <PacmanLoading />
      ) : (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
