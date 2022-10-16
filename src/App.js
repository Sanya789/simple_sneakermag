import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import axios from 'axios';
import Favourite from './pages/Favourite';
import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favourites, setFavourites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/Items');
      const cartResponse = await axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/cart');
      const favouritesResponse = await axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/favourite');
      setIsLoading(false)
      setFavourites(favouritesResponse.data)
      setCartItems(cartResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://63428d96ba4478d4783d8d19.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://63428d96ba4478d4783d8d19.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63428d96ba4478d4783d8d19.mockapi.io/cart/${id}`);
    console.log(id);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onАddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => favObj.id === obj.id)) {
        console.log(obj);
        axios.delete(`https://63428d96ba4478d4783d8d19.mockapi.io/favourite/${obj.id}`)
        setFavourites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://63428d96ba4478d4783d8d19.mockapi.io/favourite', obj);
        setFavourites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избраное')
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favourites,
      isItemAdded,
      onАddToFavourite,
      setCartOpened,
      setCartItems
      // searchValue,
      // cartOpened,
      // isLoading
    }}>
      <div className="wrapper clear">
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path='/' exac element={
            <Home
              items={items}
              favourites={favourites}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onАddToFavourite={onАddToFavourite}
              cartItems={cartItems}
              isLoading={isLoading}
            />}>
          </Route>
          <Route path='/favourite' exac
            element={
              <Favourite />
            }>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider >
  );
}

export default App;
