import React, { useState, useContext, useEffect } from "react";
import styles from "./ItemAdd.module.css";
import { ItemsContext } from "../ItemsContext";
import PremadeItems from "../PremadeItems.json";
import { nanoid } from "nanoid";

export default function ItemAdd(props) {
    const items = useContext(ItemsContext)
    const allItems = PremadeItems.concat(useContext(ItemsContext));
    const [chosenCategory, setChosenCategory] = useState(allItems[0].category);
    const [formItem, setFormItem] = useState({
        category: chosenCategory,
        name: allItems[0].name,
        quantity: "",
        price: "",
    });


    useEffect(() => {
        handleChange({
            target: {
                name: "name",
                value: document.getElementById("selectedItem").value,
            },
        });
    }, [chosenCategory]);

    function handleChange(event) {
        const { value, name } = event.target;
        setFormItem((prevItem) => {
            return {
                ...prevItem,
                [name]: value,
            };
        });
    }

    let categories = [];
    const itemsOfCategory = [];
    allItems.forEach((item) => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
        if (
            item.category === chosenCategory &&
            !itemsOfCategory.includes(item.name)
        ) {
            itemsOfCategory.push(item.name);
        }
    });

    const itemsOfCategoryElements = itemsOfCategory.map((item) => (
        <option value={item} key={nanoid()}>{item}</option>
    ));

    const categoryElements = categories.map((category) => (
        <option value={category} key={nanoid()}>{category}</option>
    ));

    function handleCategoryChange(event) {
        setChosenCategory(event.target.value);
        handleChange(event);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (items.length !== process.env.REACT_APP_MAX_ITEMS) {
            if (
                formItem.category &&
                formItem.name &&
                !isNaN(parseInt(formItem.price)) &&
                !isNaN(parseInt(formItem.quantity))
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
        <div className={styles.item_add}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_box}>
                    <label htmlFor="category">קטגוריה: </label>
                    <select
                        onChange={handleCategoryChange}
                        value={formItem.category}
                        id="category"
                        name="category"
                        className={styles.select_add}
                    >
                        {categoryElements}
                    </select>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="selectedItem">בחר מוצר: </label>
                    <select
                        value={formItem.name}
                        id="selectedItem"
                        onChange={handleChange}
                        name="name"
                        className={styles.select_add}
                    >
                        {itemsOfCategoryElements}
                    </select>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="quantity">כמות: </label>
                    <input
                        onChange={handleChange}
                        id="quantity"
                        name="quantity"
                        className={styles.input_add}
                        placeholder="הזן כמות"
                    ></input>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="price">מחיר ליחידה: </label>
                    <input
                        onChange={handleChange}
                        id="price"
                        name="price"
                        className={styles.input_add}
                        placeholder="הזן מחיר ליחידה"
                    ></input>
                </div>
                <button type="submit">הוסף מוצר!</button>
            </form>
        </div>
    );
}
