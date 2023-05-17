import React, { useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef('')
  const searchCocktail = () =>{
    setSearchTerm(searchValue.current.value)
  }
  const handleSubmit = (e) => {e.preventDefault()}
  React.useEffect(()=>{
    searchValue.current.focus();
  },[])
  return (
    <section className="section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-control">
          <label htmlFor="name">search for cocktail</label>
          <input type="text" id='name' ref={searchValue} onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm