import { useEffect, useState } from "react";
import { getRecipe } from "../services/RecipesService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

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
    return (
      <PacmanLoader />
      //<div className="spinner-border" role="status">
      // <span className="visually-hidden">Loading...</span>
      //</div>
    );
  }

  return (
    <>
      <h1 className="mb-5">Recipe details</h1>
      <img
        src={recipe.urlImage}
        className="img-thumbnail mb-5"
        width={200}
        alt={recipe.img}
      ></img>
      <div className="card text-center">
        <div className="card-header">Details</div>
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <Link to="/" className="btn btn-primary mx-2">
            Go back
          </Link>
          
        </div>
        
      </div>
    </>
  );
}

export default RecipeDetails;
