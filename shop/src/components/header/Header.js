import './Header.scss';

import Cart from './../cart';

const Header = () => {
  return (
    <div className="header-container">
      <h1>MyShop</h1>
      <Cart></Cart>
    </div>
  );
};

export default Header;
