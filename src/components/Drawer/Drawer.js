import React from "react";
import axios from "axios";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms)
})

export default function Drawer({ onClose, items = [], onRemove, opened }) {
  // const { cartItems, setCartItems } = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { cartItems, setCartItems, totalPrice } = useCart()
  // const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + Number(sum), 0)


  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://63428d96ba4478d4783d8d19.mockapi.io/orders', { items: cartItems });
      //await axios.put('https://63428d96ba4478d4783d8d19.mockapi.io/cart', []);
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        axios.delete('https://63428d96ba4478d4783d8d19.mockapi.io/cart' + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert('Не удалось создать заказ')
    }
    setIsLoading(false)
  }



  return (
    <div className={`${styles.drawerOverlay} ${opened ? styles.drawerOverlayVisible : ''}`}>

      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="close" />
        </h2>
        {
          items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((item) => (
                  <div key={item.id} className="cartItem d-flex align-center mb-20">
                    {/* <img className="cartItemImg" src={`${item.imageUrl.replace('simple_sneakermag', '')}`} alt='sneaker'/> */}
                    {/* <div className="cartItemImg" style={{ backgroundImage: `url(${item.imageUrl})` }}></div> */}
                    <img className="cartItemImg" src={`${item.imageUrl}`} alt='sneaker'/>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(item.id)} className="removeBtn" src="img/btn-remove.svg" alt="remove" />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul >
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>НДС 20%:</span>
                    <div></div>
                    <b>{totalPrice / 100 * 20} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
                  Оформить заказ
                  <img src="img/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>)
            :
            (
              <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                image={isOrderComplete ? "simple_sneakermag/img/complete-order.png" : "simple_sneakermag/img/empty-cart.jpeg"} />
            )
        }
      </div>
    </div>
  )
}
