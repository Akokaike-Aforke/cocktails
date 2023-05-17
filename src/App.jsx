import './App.css'
import { useGlobalContext } from './context'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
import SharedLayOut from './pages/SharedLayOut'
import SingleCocktail from './pages/SingleCocktail'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SharedLayOut />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />}/>
        <Route path='/cocktail/:cocktailId' element={<SingleCocktail />}/>
        <Route path='*' element={<Error />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
