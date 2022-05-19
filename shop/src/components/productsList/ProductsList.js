import React, { useContext } from 'react';
import './ProductsList.scss';
import { AppContext as Context } from './../../context/context';
import Product from './../product';

const ProductsList = () => {
  const store = useContext(Context);
  const products = store[0].products;

  return (
    <div className="products-list-container">
      {products && products.map((product, index) => {
        return <Product key={index} product={product}></Product>
      })}
    </div>
  );
};

export default ProductsList;