import React, { useState } from "react";

import styles from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

export const UserSignUpForm = ({ handleClose, toggleCurrentFormType }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const a = {name: 'dog', email: 'qweeqw@gmail.com', password: '121124', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Buck_The_GSD.jpg/250px-Buck_The_GSD.jpg'}

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;
    dispatch(createUser(values));
    handleClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close}>
        <svg className="icon" onClick={handleClose}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}></use>
        </svg>
      </div>
      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            placeholder="Your avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div
          className={styles.link}
          onClick={() => {
            toggleCurrentFormType("login");
          }}
        >
          I alredy have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};
