import React from 'react';
import styles from './Card.module.scss';

export default function Card({title, imageUrl, price, onClickFavourite, onPlus}) {
  const [isAdded, setIsAdded] = React.useState(false)
  const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded)
  }

  React.useEffect(() => {

  }, [isAdded])

  return (
    <div className={styles.card}>
      <div className={styles.favourite} onClick={onClickFavourite}>
        <img src="/img/empty-like.svg" alt="empty-like" />

      </div>
      <img src={imageUrl} alt="sneakers" width={133} height={112} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center" >
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className={styles.plus} src={isAdded === true ? "/img/added.svg" : "/img/button.svg"} alt="plus" onClick={onClickPlus} />
      </div>
    </div>
  )
}


