import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Cart.module.css";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.user);
  const changeQuantity = (item, quantity) => {
    console.log({ ...item, quantity }, "LOL");
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (item) => {
    dispatch(removeItemFromCart(item));
  };
  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your Cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is Empty</div>
      ) : (
        <div className={styles.list}>
          {cart.map((item) => {
            const { id, title, price, images, category, quantity } = item;
            return (
              <>
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>
                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        ></use>
                      </svg>
                    </div>
                    <span>{quantity}</span>
                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        ></use>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}$</div>
                  <div
                    className={styles.close}
                    onClick={() => removeItem(item)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      ></use>
                    </svg>
                  </div>
                </div>
              </>
            );
          })}
          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {cart
                  .map(({ quantity, price }) => quantity * price)
                  .reduce((acc, price) => acc + price, 0)}{" "}
                $
              </span>
            </div>
            <button className={styles.procced}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </section>
  );
};
