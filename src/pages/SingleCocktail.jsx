import React from "react";
import { useParams } from "react-router"
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { useState } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const SingleCocktail = () => {
  const { cocktails } = useGlobalContext();
  const {cocktailId} = useParams();
  const [loading, setLoading] = useState(true);
  const [cocktail, setCocktail] = useState(null);
  
  
  React.useEffect(()=>{
    setLoading(true);
    async function getCocktail (){
      try{
        const response = await fetch(`${url}${cocktailId}`);
        const data = await response.json();
        console.log(data.drinks)
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail ={name, image, info, category, glass, instructions, ingredients}
          setCocktail(newCocktail)
        } 
        else {
          setCocktail(null);
        }
        setLoading(false);
        console.log(data.drinks)
      }
      catch(err){
        console.log(err)
        setLoading(false)
      }
    }
    getCocktail();
  }, [cocktailId])
  if(loading){
    return <div>loading...</div>
  }
  if(!cocktail){
    return <h2 className="section-title">no cocktail to display</h2>
  }
  const{name, image, info, category, glass, instructions, ingredients} = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {ingredients.map((ingredient, index) =>{return ingredient ? <span key={index}>{ingredient}</span>: null})}
          </p>
        </div>
      </div>
    </section>
  );
}

export default SingleCocktail