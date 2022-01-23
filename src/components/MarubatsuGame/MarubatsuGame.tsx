import React from "react";
import styles from "./MarubatsuGame.module.scss";
import Row from "./Row";

type BoardNumbersType = [
  [number, number, number],
  ...[number, number, number][]
];

const numbers: BoardNumbersType = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const MarubatsuGame: React.FC = () => {
  const number = numbers.map((c) => <Row column={c} />);

  return <div className={styles.bord}>{number}</div>;
};

export default MarubatsuGame;
