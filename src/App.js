import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import axios from 'axios';
import Favourite from './pages/Favourite';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favourites, setFavourites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/Items').then((res) => {
      setItems(res.data)
    });
    axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    });
    axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/favourite').then((res) => {
      setFavourites(res.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://63428d96ba4478d4783d8d19.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
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
      alert('Не удалось добавить в корзину')
    }
  }

  return (
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
          />}>
        </Route>
        <Route path='/favourite' exac
          element={
            <Favourite
              items={favourites} onАddToFavourite={onАddToFavourite}
            />
          }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
