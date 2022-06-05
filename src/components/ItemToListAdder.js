import React from "react";
import ItemCreate from "./ItemCreate";
import ItemAdd from "./ItemAdd";
import ItemToListAdderCSS from "./ItemToListAdder.module.css";
import axios from "axios";
import addBoxIcon from "../assets/add_box.svg";

export default function ItemToListAdder(props) {
    async function handleNewItem(item) {
        console.log("sending: " + JSON.stringify(item));
        await axios.post("http://localhost:3001/newItem", item);
        props.getItems();
    }

    return (
        <div className={ItemToListAdderCSS.item_to_list_adder}>
            <div className={ItemToListAdderCSS.center}>
                <img
                    src={addBoxIcon}
                    className={ItemToListAdderCSS.add_box_icon}
                ></img>
                <h3>הוסף מוצר חדש:</h3>
            </div>
            <div className={ItemToListAdderCSS.horizontal}>
                <ItemCreate handleNewItem={(item) => handleNewItem(item)} />
                <ItemAdd handleNewItem={(item) => handleNewItem(item)} />
            </div>
        </div>
    );
}
