import { useEffect, useState } from "react";
import { getRecipe } from "../services/RecipesService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import "../index.css";

//import { parseDate } from "../../public/utils";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipe(id)
      .then((rcp) => {
        setRecipe(rcp);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteBtnClick = () => {
    deleteRecipe(id)
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  if (loading) {
    return <PacmanLoader />;
  }

  return (
    <>
      <div className="container mt-5">
        <h1>{recipe.name}</h1>
        <p>{recipe.phrase}</p>

        <h3 className="mb-3"><u>Tiempo de preparación</u> {recipe.preparationTime}minutos</h3>

        <h3><u>Ingredientes</u>({recipe.people}personas)</h3>
        <ul className="custom-list">
        {recipe.ingredients.map((ingredient) => (
            <li>
              {ingredient}
            </li>
          ))}
        </ul>

        <h3><u>Elaboración</u></h3>
        <ul className="custom-list">
        {recipe.steps.map((step, i) => (
            <li key={i}>
              <strong>Paso {i + 1}:</strong> {step}
            </li>
          ))}
        </ul>
        
      </div>
    </>
  );
}

export default RecipeDetails;
