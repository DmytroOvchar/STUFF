import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";

import styles from "../../styles/Category.module.css";
import { Products } from "../Products/Products";

export const Category = () => {
  const { id } = useParams();
  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };
  const [categoryName, setCategoryName] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [values, setValues] = useState(defaultValues);
  const [items, setItems] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  const { list } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  useEffect(() => {
    if (isLoading) return;

    if (!data.length) return setIsEnd(true);

    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === +id);

    setCategoryName(category);
  }, [list, id]);

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setIsEnd(false)
  };
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{categoryName?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden></button>
      </form>
      {isLoading ? (
        <div className="preloder">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No Results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};
