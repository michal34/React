import React, { useState, useContext, useEffect } from 'react';
import { AppContext as Context } from './../../context/context';
import data from './../../db/db.json'
import './Filters.scss';

const Filters = () => {
  const [store, setStore] = useContext(Context);
  const [allProducts, setAllProducts] = useState([]);
  const [productTypes] = useState(['Pokaż wszystko','SMARTFON', 'MONITOR', 'TABLET', 'LAPTOP']);
  
  const filter = (e) => {
    const type = e.target.value;
    const filteredProducts = [];
    
    if (type !== 'Pokaż wszystko') {
      // eslint-disable-next-line
      allProducts.map((product) => {
        if (product.type === type) {
          filteredProducts.push(product);
        };
      });
      store.products = filteredProducts;
      const newStore = Object.assign({}, store);
      setStore(newStore);
    } else {
      store.products = allProducts;
      const newStore = Object.assign({}, store);
      setStore(newStore);
    }
   
  };
  
  useEffect(() => {
    const products = data;
    setAllProducts(products);
  }, [setAllProducts]);
  
  return (
    <div className="filters-container">
      <h1>Filters</h1>
      <select onChange={(e) => filter(e)}>
        {productTypes.map((type,index)=>{
          return <option key={index} value={type}>{type}</option>
        })}
      </select>
    </div>
  )
};

export default Filters;