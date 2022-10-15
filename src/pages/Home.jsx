import Card from '../components/Card/Card'


export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart, onАddToFavourite 
}) {
  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          {searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className="removeBtn cu-p clear"
              src="/img/btn-remove.svg"
              alt="clear" />}
          <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) =>
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onPlus={(item) => onAddToCart(item)}
            onFavourite={(item) => onАddToFavourite(item)}
          />
        )}
      </div>
    </div>
  )
}
