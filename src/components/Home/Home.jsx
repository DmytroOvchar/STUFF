import React, { useEffect } from "react";
import { Poster } from "../Poster/Poster";
import { Products } from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../Categories/Categories";
import { Banner } from "../Banner/Banner";
import { filteredByPrice } from "../../features/products/productsSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { filtered, list },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!list.length) return;
    dispatch(filteredByPrice(100));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less 100$" />
    </>
  );
};
