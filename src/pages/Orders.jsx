import React from "react"
import Card from "../components/Card/Card"
import axios from "axios"

export default function Orders() {
  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    async function fetchOrders() {
      const { data } = await axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/orders');
    }
    fetchOrders()
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои заказы</h1>

      </div>
      <div className="d-flex flex-wrap">
        {[].map((item, index) =>
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favourite={true}
          // onPlus={(item) => onAddToCart(item)}
          // onFavourite={(item) => onАddToFavourite(item)}
          />
        )}
      </div>
    </div>
  )
}
