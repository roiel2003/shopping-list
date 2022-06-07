import React, { useState, useContext } from "react";
import styles from "./ItemCreate.module.css";
import { ItemsContext } from "../ItemsContext";

export default function ItemCreate(props) {
    const [formItem, setFromItem] = useState({
        category: "",
        name: "",
        quantity: "",
        price: "",
    });

    const items = useContext(ItemsContext)

    function handleChange(event) {
        const { value, name } = event.target;
        setFromItem((prevItem) => {
            return {
                ...prevItem,
                [name]: value,
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(items !== process.env.REACT_APP_MAX_ITEMS) {
            if (
                formItem.category &&
                formItem.name &&
                !isNaN(formItem.price) &&
                !isNaN(formItem.quantity)
            ) {
                props.handleNewItem(formItem);
            } else {
                alert("הנתונים שהזנת לא מתאימים");
            }
        } else {
            alert("הגעת לכמות מוצרים מקסימלית")
        }
    }

    return (
        <div className={styles.item_create}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_box}>
                    <label htmlFor="category">קטגוריה: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.category}
                        id="category"
                        name="category"
                        className={styles.input_create}
                        placeholder="הזן קטגוריה"
                    ></input>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="name">שם: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.name}
                        id="name"
                        name="name"
                        className={styles.input_create}
                        placeholder="הזן שם מוצר"
                    ></input>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="quantity">כמות: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.quantity}
                        id="quantity"
                        name="quantity"
                        className={styles.input_create}
                        placeholder="הזן כמות"
                    ></input>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="price"> מחיר ליחידה: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.price}
                        id="price"
                        name="price"
                        className={styles.input_create}
                        placeholder="הזן מחיר ליחידה"
                    ></input>
                </div>
                <button type="submit">הוסף מוצר!</button>
            </form>
        </div>
    );
}
