import React from "react";
import styles from "./Item.module.scss";

interface Props {
  item: number;
  onClickHandler: () => void;
}

const Item: React.FC<Props> = ({ item, onClickHandler }) => {
  return (
    <li className={styles.item} onClick={onClickHandler}>
      {item}
    </li>
  );
};

export default Item;
