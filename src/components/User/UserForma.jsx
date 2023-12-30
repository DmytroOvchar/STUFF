import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSignUpForm } from "./UserSignUpForm";
import styles from "../../styles/User.module.css";
import { toggleFormType, toggleForm } from "../../features/user/userSlice";
import { UserLoginForm } from "./UserLoginForm";

export const UserForma = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector((state) => state.user);
  const handleClose = () => {
    dispatch(toggleForm(false));
  };
  const toggleCurrentFormType = (type) => {
    dispatch(toggleFormType(type));
  };
  return (
    showForm && (
      <>
        <div className={styles.overlay} onClick={handleClose} />
        {formType === "signup" ? (
          <UserSignUpForm
            handleClose={handleClose}
            toggleCurrentFormType={toggleCurrentFormType}
          />
        ) : (
          <UserLoginForm
            handleClose={handleClose}
            toggleCurrentFormType={toggleCurrentFormType}
          />
        )}
      </>
    )
  );
};
