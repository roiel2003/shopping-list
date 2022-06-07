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
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className={AppCSS.app}>
            <ItemsContext.Provider value={items}>
                <ItemList
                    setItems={(callback) => setItems(callback)}
                    getItems={getItems}
                />
                <ItemToListAdder getItems={getItems} />
            </ItemsContext.Provider>
        </div>
    );
}
