import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import axios from 'axios';
import Favourite from './pages/Favourite';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favourites, setFavourites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favouritesResponse] = await Promise.all([
          axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/Items'),
          axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/cart'),
          axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/favourite')
        ]);

        setIsLoading(false)
        setFavourites(favouritesResponse.data)
        setCartItems(cartResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
     const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        axios.delete(`https://63428d96ba4478d4783d8d19.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      } else {
        axios.post('https://63428d96ba4478d4783d8d19.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://63428d96ba4478d4783d8d19.mockapi.io/cart/${id}`);
      console.log(id);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Не удалось удалить объект')
    }
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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favourites,
      isItemAdded,
      onАddToFavourite,
      setCartOpened,
      setCartItems,
      onAddToCart,
      // searchValue,
      // cartOpened,
      // isLoading
    }}>
      <div className="wrapper clear">

        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened} />

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
          <Route path='favourite' exac
            element={
              <Favourite />
            }>
          </Route>
          <Route path='orders' element={<Orders />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider >
  );
}

export default App;
