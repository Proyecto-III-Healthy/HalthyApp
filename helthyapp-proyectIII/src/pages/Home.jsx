import { useState } from "react";
import { createChat } from "../services/ChatService";

const INGREDIENTS_VALUES = [
    {
        text: "Arroz",
        value: "arroz",
        icon: "fa-bowl-rice"
    },
    {
        text: "Pollo",
        value: "pollo",
        icon: "fa-drumstick-bite"

    }
]

const Home = () => {
    const [ingredients, setIngredients] = useState([])
 

    const handleIngredient = (e) => {
        const {value} = e.target
        if(ingredients.includes(value)){
          setIngredients(ingredients.filter(ingredient => {
            return ingredient !== value 
          }))
        } else {
            setIngredients([...ingredients, value])
        }

        // setIngredients añadiendolo si no está en el array
        // setIngredients filtrando ese ingrediente si ya está
    }

    const onSubmit = (event) => {
      event.preventDefault();
      createChat(ingredients)
      .then((ingredients) => {
        res.send(ingredients)
      })
      .catch(err => console.error(err))
       
    }
    
    return (
        <div className="container mt-5">
            <h1>Home</h1>
            <form onSubmit={onSubmit}>
                {INGREDIENTS_VALUES.map(ingredient => (
                    <button key={ingredient.value} type="button" className="btn btn-primary" value={ingredient.value} onClick={handleIngredient}>
                    {!ingredients.includes(ingredient.value) ? <i className={`fa-solid ${ingredient.icon}`}></i> : <i class="fa-solid fa-check"></i>} {ingredient.text}
                    </button>
                ))}
                <button type="submit">Enviar</button>
            </form>

        </div>
    );
};

export default Home;