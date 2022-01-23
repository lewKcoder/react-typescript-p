import React from "react";
import styles from "./Row.module.scss";
import Item from "./Item";

interface Props {
  column: [number, number, number];
  onClickHandler: () => void;
}

const Row: React.FC<Props> = ({ column, onClickHandler }) => {
  const item = column.map((i) => (
    <Item item={i} onClickHandler={onClickHandler} />
  ));

  return <ul className={styles.row}>{item}</ul>;
};

export default Row;
