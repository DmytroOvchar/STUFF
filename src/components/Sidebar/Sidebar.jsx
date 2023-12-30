import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { list, isLoading } = useSelector((state) => state.categories);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        {isLoading ? (
          <div>IS LOADING...</div>
        ) : (
          <ul className={styles.menu}>
            {list.map(({ id, name }) => (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                  to={`/category/${id}`}
                  end
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className={styles.footer}>
        <a href="/help" className={styles.link} target="_blank">
          Help
        </a>
        <a
          href="/help"
          className={styles.link}
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </aside>
  );
};
