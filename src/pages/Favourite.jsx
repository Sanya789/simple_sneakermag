import React from "react"
import Card from "../components/Card/Card"
import AppContext from "../context"


export default function Favourite() {

  const { favourites, onАddToFavourite } = React.useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои закладки</h1>

      </div>
      <div className="d-flex flex-wrap">
        {favourites.map((item, index) =>
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
