import React, { useEffect, useState } from "react";
import { useContext } from "react";
const AppContext = React.createContext();

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const fetchCocktails = async () =>{
    setLoading(true);
      try{
          const data = await fetch(`${url}${searchTerm}`)
          const cocktails = await data.json();
          const { drinks } = cocktails;
          if(drinks){
              const newCocktails = drinks.map(drink =>{
                  const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink;
                  return {
                    id:idDrink,
                    name:strDrink,
                    image:strDrinkThumb,
                    info:strAlcoholic,
                    glass:strGlass,
                  };
              })
              setCocktails(newCocktails)
          }
          else{setCocktails([])}
          setLoading(false)
      }
      catch(err){
          console.log(err)
          setLoading(false)
      }
  }
  useEffect(()=>{
      fetchCocktails();
  }, [searchTerm])
  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => useContext(AppContext);
