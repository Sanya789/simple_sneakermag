import Card from "../components/Card/Card"

export default function Favourite({
  items,
  searchValue,
  onAddToCart, onАddToFavourite
}) {
  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои закладки</h1>

      </div>
      <div className="d-flex flex-wrap">
        {items.map((item, index) =>
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favourite={true}
            // onPlus={(item) => onAddToCart(item)}
            onFavourite={(item) => onАddToFavourite(item)}
          />
        )}
      </div>
    </div>
  )
}
