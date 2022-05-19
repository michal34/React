import React, { useEffect, useContext } from 'react';
import './App.scss';
import Filters from './components/filters';
import Footer from './components/footer';
import Header from './components/header';
import ProductsList from './components/productsList';
import { AppContext as Context } from './context/context';
import data from './db/db.json';

const App = () => {
  const [store, setStore] = useContext(Context);

  useEffect(() => {
    store.products = data;
    const newStore = Object.assign({}, store);
    setStore(newStore);
  }, [setStore]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app-container">
      <Header></Header>
      <Filters></Filters>
      <ProductsList></ProductsList>
      <Footer></Footer>
    </div>
  );
};

export default App;

