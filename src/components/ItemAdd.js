import React, { useState, useContext, useEffect } from "react";
import ItemAddCSS from "./ItemAdd.module.css";
import { ItemsContext } from "../ItemsContext";
import PremadeItems from "../PremadeItems.json";

export default function ItemAdd(props) {
    const items = PremadeItems.concat(useContext(ItemsContext));
    const [chosenCategory, setChosenCategory] = useState(items[0].category);
    const [formItem, setFormItem] = useState({
        category: chosenCategory,
        name: items[0].name,
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
    items.forEach((item) => {
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
        <option value={item}>{item}</option>
    ));

    const categoryElements = categories.map((category) => (
        <option value={category}>{category}</option>
    ));

    function handleCategoryChange(event) {
        setChosenCategory(event.target.value);
        handleChange(event);
    }

    function handleSubmit(event) {
        event.preventDefault();
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
    }

    return (
        <div className={ItemAddCSS.item_add}>
            <form onSubmit={handleSubmit}>
                <select
                    onChange={handleCategoryChange}
                    defaultValue="default"
                    name="category"
                    className={ItemAddCSS.select_add}
                >
                    {categoryElements}
                </select>
                <select
                    id="selectedItem"
                    onChange={handleChange}
                    name="name"
                    className={ItemAddCSS.select_add}
                >
                    {itemsOfCategoryElements}
                </select>
                <input
                    onChange={handleChange}
                    name="quantity"
                    className={ItemAddCSS.input_add}
                    placeholder="הזן כמות"
                ></input>
                <input
                    onChange={handleChange}
                    name="price"
                    className={ItemAddCSS.input_add}
                    placeholder="הזן מחיר ליחידה"
                ></input>
                <button type="submit">הוסף מוצר!</button>
            </form>
        </div>
    );
}
