import React from 'react';
import styles from './Card.module.scss';

export default function Card({ id, title, imageUrl, price, onPlus, onFavourite, favourite = false }) {
  const [isAdded, setIsAdded] = React.useState(false)
  const [isFavourite, setIsFavourite] = React.useState(favourite)
  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded)
  }

  const onClickFavourite = () => {
    console.log(id + ' in card');
    onFavourite({ id, title, imageUrl, price })
    setIsFavourite(!isFavourite)
  }

  // React.useEffect(() => {

  // }, [isAdded])

  return (
    <div className={styles.card}>
      <div className={styles.favourite} onClick={onClickFavourite}>
        <img src={isFavourite === true ? "/img/filled-like.svg" : "/img/empty-like.svg"} alt="empty-like" />

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


