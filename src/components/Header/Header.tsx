import React from "react";
import logo from "../../logo.svg";
import styles from "./Header.module.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.App_header}>
      <Link className={styles.App_link} to="/">
        <img src={logo} className={styles.App_logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Header;
