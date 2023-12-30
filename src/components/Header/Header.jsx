import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes";

import logo from "../../images/logo.svg";
import ava from "../../images/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector((state) => state.user);
  const [values, setValues] = useState({ name: "Guest", avatar: ava });
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });
  console.log(data, isLoading, "HEADER");
  console.log(searchValue);
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);
  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <img src={`${values.avatar}`} className={styles.avatar} />
          <div className={styles.username}>{values.name}</div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.icon}>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            type="search"
            name="search"
            placeholder="Search for anything..."
            autoComplete="off"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? "LOADING"
              : !data.length
              ? "NO RESULTS"
              : data.map(({ title, images, id }) => {
                  return (
                    <Link
                      key={id}
                      onClick={() => setSearchValue("")}
                      to={`products/${id}`}
                      className={styles.item}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      ></div>
                      <div className={styles.title}>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )}
      </form>
      <div className={styles.account}>
        <Link to={ROUTES.HOME} className={styles.favourites}>
          <svg className={styles["icon-fav"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
        </Link>
        <Link to={ROUTES.CART} className={styles.cart}>
          <svg className={styles["icon-cart"]}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          {!!cart.length && <span className={styles.count}>{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
};
