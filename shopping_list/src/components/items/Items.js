import './Items.scss';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Board from '../board/Board';
import Card from '../card/Card';


const myStorage = localStorage;
const initialList = [];
const addInput = React.createRef();
const searchInput = React.createRef();
let listka = [];

const Items = (props) => {
    const [lista, setList] = useState(initialList);

    if (listka.length === 0 && myStorage.lista) {
        listka = myStorage.lista.split(',');
    }

    const clickFn = () => {
        listka = listka.concat(addInput.current.value);
        myStorage.setItem('lista', listka);
        setList(myStorage.lista.split(','));
    }

    const searchFn = () => {
        const szukana = searchInput.current.value;
        const szukanaLista = [];
        lista.forEach(element => {
            if (element.includes(szukana) && szukana !== '') {
                szukanaLista.push(element);
                listka = szukanaLista
                setList(listka)
            }
            else if (szukana === '') {
                listka = myStorage.lista.split(',')
                setList(listka)       
            }
        })
    }

    const listClear = () => {
        myStorage.clear();
        window.location.reload();
    }
    // eslint-disable-next-line
    useEffect(()=> {
        setList(listka);
    })
    
    return (
        <div className="App-items">
        <div>
            <input type='text' ref={addInput}></input>
            <button onClick={clickFn}>Add</button>
            <input ref={searchInput} type='text' onChange={searchFn}></input>
        </div>
        <div>
            <button onClick={listClear}>clear</button>
        </div>
        <h1>Items</h1>
        <div className="flexbox">
            <Board id="board-1" className="board">
                <h2>List</h2>
                <ul>
                    {listka.map((item, index) => (
                    <Card id="card-1" draggable="true" key={index}>{item}</Card>
                    ))}
                </ul>
            </Board>

            <Board id="board-2" className="board">
                <h2>Done</h2>
            </Board>
        </div>
    </div>
  );
};

export default Items;