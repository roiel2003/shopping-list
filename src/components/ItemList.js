import React, { useState, useContext } from "react";
import styles from "./ItemList.module.css";
import ListItem from "./ListItem";
import { ItemsContext } from "../ItemsContext";
import sortIcon from "../assets/sort.svg";
import reactIcon from "../assets/react_icon.svg";
import vIcon from "../assets/v_icon.svg";
import xIcon from "../assets/x_icon.svg";
import axios from "axios";

export default function ItemList(props) {

    const [sortedByCategory, setSortedByCategory] = useState(false)
    const [sortedByPrice, setSortedByPrice] = useState(false)
    const [sortedByTotalPrice, setSortedByTotalPrice] = useState(false)

    const items = useContext(ItemsContext);

    const itemElements = items.map((item) => <ListItem item={item} key={item.key} itemDelete={itemDelete}/>);

    const totalCost = items.reduce((a, b) => {
        return a + b.price * b.quantity;
    }, 0);

    async function itemDelete(key) {
        try {
            await axios.delete('http://localhost:3001/deleteItem', {
                headers: {
                  Authorization: ""
                },
                data: {
                    key: key
                }
            })
            props.getItems();
        } catch (error) {
            console.log(error)
        }
    }


    function sortByCategory() {
        props.setItems((prevItem) => {
            prevItem.sort((a, b) => a.category.localeCompare(b.category));
            if (sortedByCategory) {
                setSortedByCategory(false)
                return [...prevItem].reverse();    
            } else {
                setSortedByCategory(true)
                setSortedByPrice(false)
                setSortedByTotalPrice(false)
                return [...prevItem];
            }
        });
    }
    function sortByPrice() {
        props.setItems((prevItem) => {
            prevItem.sort((a, b) => a.price - b.price);
            if (sortedByPrice) {
                setSortedByPrice(false)
                return [...prevItem].reverse();    
            } else {
                setSortedByCategory(false)
                setSortedByPrice(true)
                setSortedByTotalPrice(false)
                return [...prevItem];
            }
        });
    }
    function sortByTotalPrice() {
        props.setItems((prevItem) => {
            prevItem.sort(
                (a, b) => a.price * a.quantity - b.price * b.quantity
            );
            if (sortedByTotalPrice) {
                setSortedByTotalPrice(false)
                return [...prevItem].reverse();    
            } else {
                setSortedByCategory(false)
                setSortedByPrice(false)
                setSortedByTotalPrice(true)
                return [...prevItem];
            }
        });
    }

    return (
        <div className={styles.item_list}>
            <div className={styles.horizontal}>
                <img src={reactIcon} className={styles.react_icon}></img>
                <h2>רשימת הקניות שלי {`(${items.length})`}</h2>
            </div>
            <div className={styles.scroll}>
                <table className={styles.list}>
                    <thead>
                        <tr>
                            <th onClick={sortByCategory}>
                                קטגוריה{" "}
                                <img
                                    className={styles.sort_icon}
                                    src={sortIcon}
                                ></img>
                            </th>
                            <th>שם מוצר</th>
                            <th>כמות</th>
                            <th onClick={sortByPrice}>
                                מחיר ליחידה{" "}
                                <img
                                    className={styles.sort_icon}
                                    src={sortIcon}
                                ></img>
                            </th>
                            <th onClick={sortByTotalPrice}>
                                מחיר עבור מוצר{" "}
                                <img
                                    className={styles.sort_icon}
                                    src={sortIcon}
                                ></img>
                            </th>
                        </tr>
                        {itemElements}
                    </thead>
                </table>
            </div>
            <div className="horizontal">
                <img
                    src={totalCost < 200 ? vIcon : xIcon}
                    className={styles.total_cost_icon}
                ></img>
                <p>עלות כוללת: {totalCost}</p>
            </div>
        </div>
    );
}
