import React from "react";
import styles from "./Row.module.scss";
import Item from "./Item";

type ColumnType = { column: [number, number, number] };

const Row: React.FC<ColumnType> = ({ column }) => {
  const item = column.map((i) => <Item item={i} />);

  return <ul className={styles.row}>{item}</ul>;
};

export default Row;
