import React, { useState } from 'react';
import styles from './MarubatsuGame.module.scss';
import Row from './Row';

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
  const [user, setUser] = useState<boolean>(true);

  const onClickHandler = () => {
    setUser((prev) => !prev);
  };

  const number = numbers.map((c) => (
    <Row column={c} user={user} onClickHandler={onClickHandler} />
  ));

  return (
    <>
      <h3>now {user ? 'Player 1' : 'Player 2'}</h3>
      <div className={styles.bord}>{number}</div>
    </>
  );
};

export default MarubatsuGame;
