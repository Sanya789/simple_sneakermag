import React from "react"
import Card from "../components/Card/Card"
import axios from "axios"
// import AppContext from "../context"

export default function Orders() {
  // const { onАddToFavourite, onAddToCart } = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get('https://63428d96ba4478d4783d8d19.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов')
        console.error(error);
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои заказы</h1>

      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            // id={item.id}
            // title={item.title}
            // price={item.price}
            // imageUrl={item.imageUrl}
            // favourite={true}
            // onPlus={(item) => onAddToCart(item)}
            // onFavourite={(item) => onАddToFavourite(item)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}
