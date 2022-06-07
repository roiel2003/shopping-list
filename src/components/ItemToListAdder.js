import React from "react";
import ItemCreate from "./ItemCreate";
import ItemAdd from "./ItemAdd";
import styles from "./ItemToListAdder.module.css";
import axios from "axios";
import addBoxIcon from "../assets/add_box.svg";
import { nanoid } from "nanoid";

export default function ItemToListAdder(props) {
    async function handleNewItem(item) {
        item.key = nanoid()
        try {
            await axios.post("http://localhost:3001/newItem", item);
            props.getItems();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.item_to_list_adder}>
            <div className={styles.center}>
                <img
                    src={addBoxIcon}
                    className={styles.add_box_icon}
                ></img>
                <h3>הוסף מוצר חדש:</h3>
            </div>
            <div className={styles.horizontal}>
                <ItemCreate handleNewItem={(item) => handleNewItem(item)} />
                <ItemAdd handleNewItem={(item) => handleNewItem(item)} />
            </div>
        </div>
    );
}
