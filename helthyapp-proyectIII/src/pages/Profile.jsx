import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { getFavorites } from "../services/RecipesService";
import PacmanLoading from "../components/PacmanLoading/PacmanLoading";
import { Link } from "react-router-dom";
import "../index.css";

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then((favoritesDB) => {
        setFavorites(favoritesDB);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PacmanLoader color="#83A580" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="h2">{favorites.length > 0 ? ('Mis Recetas Favoritas') : ('Aún no tienes recetas favoritas')}</h2>
      {favorites.map((recipe) => (
        <div
          className="card mb-3"
          style={{ maxWidth: "540px", margin: "20px auto" }}
          key={recipe._id}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={recipe.imageUrl || "https://content.elmueble.com/medio/2023/03/31/croquetas-de-queso-y-calabacin_00000000_230821131907_600x802.jpg"}
                className="img-fluid rounded-start"
                alt={recipe.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.phrase}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {recipe.preparationTime} min
                  </small>
                </p>
                <Link to={`/recipes/${recipe._id}`}>Ver más</Link>
              </div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
