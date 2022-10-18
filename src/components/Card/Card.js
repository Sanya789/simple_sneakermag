import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from '../../context';

export default function Card({ id, title, imageUrl, price, onPlus, onFavourite, favourite = false, loading = false }) {
  const { isItemAdded } = React.useContext(AppContext)
  const [isFavourite, setIsFavourite] = React.useState(favourite)
  const obj = { id, parentId: id, title, imageUrl, price }
  const onClickPlus = () => {
    onPlus(obj);
  }

  const onClickFavourite = () => {
    onFavourite(obj)
    setIsFavourite(!isFavourite)
  }

  console.log(id, isItemAdded(id));

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader
          speed={1}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="1" y="101" rx="5" ry="5" width="150" height="15" />
          <rect x="1" y="126" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="174" rx="5" ry="5" width="80" height="25" />
          <rect x="112" y="168" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> :
          <>
            {onFavourite && (
              <div className={styles.favourite} onClick={onClickFavourite}>
                <img src={isFavourite === true ? "/img/filled-like.svg" : "/img/empty-like.svg"} alt="empty-like" />
              </div>
            )}
            <img src={imageUrl} alt="sneakers" width={133} height={112} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center" >
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && 
              <img className={styles.plus} 
              src={isItemAdded(id) === true ? "/img/added.svg" : "/img/button.svg"} 
              alt="plus" 
              onClick={onClickPlus} />}
            </div>
          </>
      }
    </div>
  )
}


