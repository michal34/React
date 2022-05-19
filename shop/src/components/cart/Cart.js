import React, { useState, useContext } from 'react';
import { AppContext as Context } from './../../context/context';
import './Cart.scss';
import cartIcon from './shopping-cart-solid.svg';

const Cart = () => {
  const [store, setStore] = useContext(Context);
  const cart = store.cart;
  const [showCartState, setShowCartState] = useState(false);
  const showCart = () => {
    if (showCartState) {
      setShowCartState(false);
      return;
    }
    setShowCartState(true);
  };

  const removeFromCart = (productToRemove) => {
    if (store.cart.includes(productToRemove)) {
      productToRemove.placeInList -= 1;
      const newStore = Object.assign({}, store);
      setStore(newStore);
    }
    if (productToRemove.placeInList === 0) {
      const newCart = store.cart.filter(product => product.id !== productToRemove.id);
      store.cart = newCart;
      const newStore = Object.assign({}, store);
      setStore(newStore);
      productToRemove.placeInList = 1;
    };
  };

  const removeAllFromCart = () => {
  if (window.confirm('Czy na pewno chcesz usunąc wszystko rzeczy z koszyka?')) {
      store.cart = [];
      const newStore = Object.assign({}, store);
      setStore(newStore);
    };
  };

  const showPrice = () => {
    let totalPrice = 0;
    let savedMoney = 0;

    // eslint-disable-next-line
    cart.map((product) => {

      totalPrice += product.promoPrice ? product.promoPrice * product.placeInList : product.price * product.placeInList;
      savedMoney += product.promoPrice ? (product.price - product.promoPrice) * product.placeInList : 0;
    });

    return ["Końcowa cena: ", totalPrice ," PLN",<br></br>, " zaoszczędzone pieniądze: ", savedMoney ," PLN"];
  }

  const howManyItemsInCart = () => {
    let itemsInCart = 0;

    // eslint-disable-next-line
    cart.map((product) => {
      itemsInCart += product.placeInList;
    })
    return itemsInCart;
  }

  return (
    <div className="cart-container">
      <div className="cart" onClick={showCart}>
        <h2>{howManyItemsInCart()}</h2>
        <img src={cartIcon} alt="icon cart"></img>
      </div>
      {showCartState && <div className="cart-content">
        {store.cart.length < 1 && <div className="empty-cart">
          <h1>Koszyk jest pusty :(</h1>  
        </div>}
        {store.cart.length > 0 && <div>
        <h2>Cart:</h2>
        {cart.map((product, index) => {
          return <div className="product-in-cart">
            <p key={index}>{product.name} {product.promoPrice ? product.promoPrice : product.price} {product.currency} {(product.placeInList > 1) ? "X" + product.placeInList : ''}</p>
            <button className="buttonRemoveProduct" onClick={() => removeFromCart(product)}>Usuń</button>
            </div>
        })}
        <button className="buttonRemoveAll" onClick={removeAllFromCart}>Usuń wszystko</button>
        <p>{showPrice()}</p>
      </div>}

          </div>}
    </div>
  );
};

export default Cart;