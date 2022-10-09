export default function Drawer({ onClose, items = [] }) {
 
 
  return (
    <div className="drawerOverlay">

      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="close" />
        </h2>

        <div className="items">
          {
            items.map((item) => (
              <div className="cartItem d-flex align-center mb-20">
                {/* <img className="cartItemImg" src={`${item.imageUrl}`} alt='img'/> */}
                <div className="cartItemImg" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{item.title}</p>
                  <b>{item.price} руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
              </div>
            ))}
        </div>

        <div className="cartTotalBlock">
          <ul >
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <b>21 489 руб.</b>
            </li>
            <li className="d-flex">
              <span>НДС 20%:</span>
              <div></div>
              <b>4298 руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ
            <img src="/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}
