import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Footer.module.css";
import { ROUTES } from "../../utils/routes";

import logo from "../../images/logo.svg";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.logo}>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="stuff" />
      </Link>
    </div>
    <div className={styles.rights}>
      Developer by{" "}
      <a
        href="https://github.com/DmytroOvchar"
        target="_blank"
        rel="noreferrer"
      >
        Ovchar
      </a>
    </div>
    <div className={styles.socials}>
      <a
        href="https://github.com/DmytroOvchar"
        target="_blank"
        rel="noreferrer"
      >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
        </svg>
      </a>
      <a
        href="https://github.com/DmytroOvchar"
        target="_blank"
        rel="noreferrer"
      >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
        </svg>
      </a>
      <a
        href="https://github.com/DmytroOvchar"
        target="_blank"
        rel="noreferrer"
      >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
        </svg>
      </a>
    </div>
  </footer>
);
