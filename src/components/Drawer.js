export default function Drawer() {
  return (
    <div style={{ display: 'none' }} className="drawerOverlay">

      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" />

        </h2>

        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div className="cartItemImg" style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div className="cartItemImg" style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999руб.</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>
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
