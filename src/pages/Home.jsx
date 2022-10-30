import React from 'react';
import Card from '../components/Card/Card'

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onАddToFavourite,
  cartItems,
  isLoading
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        // id={item.id}
        // title={item.title}
        // price={item.price}
        // imageUrl={item.imageUrl}
        cartItems={cartItems}
        onPlus={(item) => onAddToCart(item)}
        onFavourite={(item) => onАddToFavourite(item)}
        // added={cartItems.some((obj) => obj.id === item.id)}
        // added={isItemAdded(item && item.id)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="simple_sneakermag/img/search.svg" alt="search" />
          {searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className="removeBtn cu-p clear"
              src="simple_sneakermag/img/btn-remove.svg"
              alt="clear" />}
          <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
        </div>
      </div>
      {
        console.log(cartItems, items)
      }
      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}
