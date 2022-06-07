import React, { useState, useContext } from "react";
import ItemCreateCSS from "./ItemCreate.module.css";

export default function ItemCreate(props) {
    const [formItem, setFromItem] = useState({
        category: "",
        name: "",
        quantity: "",
        price: "",
    });

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
    }

    return (
        <div className={ItemCreateCSS.item_create}>
            <form onSubmit={handleSubmit}>
                <div className={ItemCreateCSS.input_box}>
                    <label htmlFor="category">קטגוריה: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.category}
                        id="category"
                        name="category"
                        className={ItemCreateCSS.input_create}
                        placeholder="הזן קטגוריה"
                    ></input>
                </div>
                <div className={ItemCreateCSS.input_box}>
                    <label htmlFor="name">שם: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.name}
                        id="name"
                        name="name"
                        className={ItemCreateCSS.input_create}
                        placeholder="הזן שם מוצר"
                    ></input>
                </div>
                <div className={ItemCreateCSS.input_box}>
                    <label htmlFor="quantity">כמות: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.quantity}
                        id="quantity"
                        name="quantity"
                        className={ItemCreateCSS.input_create}
                        placeholder="הזן כמות"
                    ></input>
                </div>
                <div className={ItemCreateCSS.input_box}>
                    <label htmlFor="price"> מחיר ליחידה: </label>
                    <input
                        onChange={handleChange}
                        value={formItem.price}
                        id="price"
                        name="price"
                        className={ItemCreateCSS.input_create}
                        placeholder="הזן מחיר ליחידה"
                    ></input>
                </div>
                <button type="submit">הוסף מוצר!</button>
            </form>
        </div>
    );
}
