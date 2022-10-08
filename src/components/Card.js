

export default function Card() {
  return (
    <div className="card">
      <div className="favourite">
        <img src="/img/empty-like.svg" alt="empty-like" />

      </div>
      <img src="/img/sneakers/1.jpg" alt="sneakers" width={133} height={112} />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between align-center" >
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className="button">
          <img src="/img/button.svg" alt="plus" />
        </button>
      </div>
    </div>
  )
}


