import { useContext, useEffect, useState } from "react";
import { createChat } from "../services/ChatService";
import { AuthContext } from "../contexts/AuthContext";
import { getRecepies } from "../services/RecepiesService";
import { PacmanLoader } from "react-spinners";

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
  const [recepiesApi, setRecepiesApi] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
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
    return (
      recepi.name.toLowerCase().includes(search.toLowerCase()) ||
      recepi.ingredients.find((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

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

    setLoadingApi(true);
    createChat(ingredients)
      .then((recepiesApiRes) => {
        setRecepiesApi(recepiesApiRes);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingApi(false));
  };
  console.log(filteredRecepies);

  return (
    <div className="container mt-5">
      <h1>Home</h1>
      <input
        className="form-control me-2 mb-3"
        type="search"
        placeholder="Escribe aquí los ingredientes"
        aria-label="Search"
        onChange={handleSearchInput}
      />
      {loadingApi ? (
        <PacmanLoader />
      ) : (
        <h3>
          Receta API:
          {/* <div
            dangerouslySetInnerHTML={{
              __html: `<body> <header> <h1>Arroz con Pollo</h1> </header> <section> <h2>Ingredientes</h2> <ul> <li>1 kg de pollo, cortado en piezas</li> <li>2 tazas de arroz</li> <li>4 tazas de caldo de pollo</li> <li>1 cebolla grande, picada</li> <li>1 pimiento verde, picado</li> <li>2 dientes de ajo, picados</li> <li>1/2 taza de guisantes</li> <li>1/2 taza de zanahorias cortadas en cubos</li> <li>1/4 de taza de aceite de oliva</li> <li>1 cucharadita de pimentón dulce</li> <li>Sal y pimienta al gusto</li> </ul> </section> <section> <h2>Preparación</h2> <ol> <li>Calienta el aceite en una cazuela grande a fuego medio-alto.</li> <li>Añade el pollo y fríelo hasta que esté dorado por todos lados. Retira el pollo y reserva.</li> <li>En la misma cazuela, añade la cebolla, el pimiento verde y el ajo, y sofríe hasta que estén blandos.</li> <li>Incorpora el arroz y fríe un par de minutos para que se mezclen los sabores.</li> <li>Agrega el caldo de pollo, el pimentón, la sal y la pimienta. Lleva a ebullición.</li> <li>Reduce el fuego, vuelve a añadir el pollo, y cocina cubierto durante 20 minutos.</li> <li>Añade los guisantes y las zanahorias. Cocina 10 minutos más o hasta que el arroz esté cocido y el líquido se haya absorbido.</li> </ol> </section> <footer> <p>Receta proporcionada por <a href="https://www.example.com">example.com</a></p> </footer> </body> `,
            }}
          ></div> */}
          {recepiesApi?.choices[0].message.content}
        </h3>
      )}

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
          <button type="submit" className="btn btn-danger">
            Enviar
          </button>
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
