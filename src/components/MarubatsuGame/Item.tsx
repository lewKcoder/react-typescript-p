import React, { useState } from 'react';
import styles from './Item.module.scss';

interface Props {
  item: number;
  user: boolean;
  onClickHandler: () => void;
}

const Item: React.FC<Props> = ({ item, user, onClickHandler }) => {
  const [status, setStatus] = useState<null | boolean>(null);

  const onStatus = () => {
    if (user) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  return (
    <li
      className={`${styles.item} ${
        status !== null ? styles.fill : styles.n_fill
      }`}
      onClick={() => {
        onClickHandler();
        onStatus();
      }}
    >
      {status ? '◯' : status === null ? item : '×'}
    </li>
  );
};

export default Item;
