import React from "react";
import styles from "./Item.module.scss";

type Item = { item: number };

const Item: React.FC<Item> = ({ item }) => {
  return <li className={styles.item}>{item}</li>;
};

export default Item;
