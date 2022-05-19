import React, { useContext } from 'react';
import { AppContext as Context } from './../../context/context';
import './Product.scss';

const Product = (props) => {
  const [store, setStore] = useContext(Context);
  const product = props.product;
  const addToCart = (product) => {
    if(store.cart.includes(product)) {
      product.placeInList += 1
      const newStore = Object.assign({}, store);
      setStore(newStore);
    } else {
      store.cart.push(product);
      const newStore = Object.assign({}, store);
      setStore(newStore);
    }
  }
  
  return (
    <div className="product-container">
      <div className="product">
        <h2>{product.name}</h2>
        <p>{product.desc}</p>
        <p className={product.promoPrice ? 'promo-price' : 'price'}>{product.price} {product.currency}</p>
        {product.promoPrice && <div>
          <p className="promo">{product.promoPrice} {product.currency}</p>
        </div>}
        <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
      </div>
    </div>
  );
};

export default Product;