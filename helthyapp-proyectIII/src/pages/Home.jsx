import { useContext, useEffect, useState } from "react";
import { createChat } from "../services/ChatService";
import { AuthContext } from "../contexts/AuthContext";
import { getRecepies } from "../services/RecepiesService";

const INGREDIENTS_VALUES = [
  {
    text: "Arroz",
    value: "arroz",
    icon: "fa-bowl-rice",
  },
  {
    text: "Pollo",
    value: "pollo",
    icon: "fa-drumstick-bite",
  },
];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [recepies, setRecepies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleSearchInput = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
  };

  useEffect(() => {
    getRecepies()
      .then((recepiesDB) => {
        setRecepies(recepiesDB);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecepies = recepies.filter((recepi) => {
    return recepi.name.includes(search);
  });
  console.log(filteredRecepies);
  const handleIngredient = (e) => {
    const { value } = e.target;
    if (ingredients.includes(value)) {
      setIngredients(
        ingredients.filter((ingredient) => {
          return ingredient !== value;
        })
      );
    } else {
      setIngredients([...ingredients, value]);
    }

    // setIngredients añadiendolo si no está en el array
    // setIngredients filtrando ese ingrediente si ya está
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createChat(ingredients)
      .then((recepiesApi) => {
        setRecepies(recepiesApi);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h1>Home</h1>
      <input
        className="form-control me-2 mb-3"
        type="search"
        placeholder="Escribe aquí los ingresdientes"
        aria-label="Search"
        onChange={handleSearchInput}
      />
      {user && (
        <form onSubmit={onSubmit}>
          {INGREDIENTS_VALUES.map((ingredient) => (
            <button
              key={ingredient.value}
              type="button"
              className="btn btn-primary"
              value={ingredient.value}
              onClick={handleIngredient}
            >
              {!ingredients.includes(ingredient.value) ? (
                <i className={`fa-solid ${ingredient.icon}`}></i>
              ) : (
                <i className="fa-solid fa-check"></i>
              )}{" "}
              {ingredient.text}
            </button>
          ))}
          <button type="submit">Enviar</button>
        </form>
      )}
      {loading ? (
        <p>loading...</p>
      ) : (
        filteredRecepies.map((recepi) => (
          <div
            className="card mb-3"
            style={{ maxWidth: "540px" }}
            key={recepi._id}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="https://content.elmueble.com/medio/2023/03/31/croquetas-de-queso-y-calabacin_00000000_230821131907_600x802.jpg"
                  className="img-fluid rounded-start"
                  alt={recepi.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{recepi.name}</h5>
                  <p className="card-text">{recepi.phrase}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {recepi.preparationTime} min
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
