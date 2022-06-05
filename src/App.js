import React, { useState, useEffect, createContext } from "react";
import ItemList from "./components/ItemList";
import ItemToListAdder from "./components/ItemToListAdder";
import axios from "axios";
import AppCSS from "./App.module.css";
import { ItemsContext } from "./ItemsContext";

export default function App() {
    const [items, setItems] = useState([]);

    async function getItems() {
        try {
            const res = await axios.get("http://localhost:3001/getItems");
            setItems(res.data);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    function sortByCategory() {
        setItems((prevItem) => {
            prevItem.sort((a, b) => a.category.localeCompare(b.category));
            return [...prevItem];
        });
    }
    function sortByPrice() {
        setItems((prevItem) => {
            prevItem.sort((a, b) => a.price - b.price);
            return [...prevItem];
        });
    }
    function sortByTotalPrice() {
        setItems((prevItem) => {
            prevItem.sort(
                (a, b) => a.price * a.quantity - b.price * b.quantity
            );
            return [...prevItem];
        });
    }

    return (
        <div className={AppCSS.app}>
            <ItemsContext.Provider value={items}>
                <ItemList
                    sortByCategory={sortByCategory}
                    sortByPrice={sortByPrice}
                    sortByTotalPrice={sortByTotalPrice}
                />
                <ItemToListAdder getItems={getItems} />
            </ItemsContext.Provider>
        </div>
    );
}
