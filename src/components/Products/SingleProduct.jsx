import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import { Product } from "../Product/Product";
import { Products } from "./Products";
import { getRelatedProducts } from "../../features/products/productsSlice";

export const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const { list, related } = useSelector(({ products }) => products);
  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <div>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </div>
  );
};
