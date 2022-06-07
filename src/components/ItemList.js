import React, { useContext } from "react";
import ItemListCSS from "./ItemList.module.css";
import ListItem from "./ListItem";
import { ItemsContext } from "../ItemsContext";
import sortIcon from "../assets/sort.svg";
import reactIcon from "../assets/react_icon.svg";
import vIcon from "../assets/v_icon.svg";
import xIcon from "../assets/x_icon.svg";
import { nanoid } from 'nanoid'

export default function ItemList(props) {
    const items = useContext(ItemsContext);

    const itemElements = items.map((item) => <ListItem item={item} key={nanoid()}/>);

    const totalCost = items.reduce((a, b) => {
        return a + b.price * b.quantity;
    }, 0);

    return (
        <div className={ItemListCSS.item_list}>
            <div className={ItemListCSS.horizontal}>
                <img src={reactIcon} className={ItemListCSS.react_icon}></img>
                <h2>רשימת הקניות שלי {`(${items.length})`}</h2>
            </div>
            <div className={ItemListCSS.scroll}>
                <table className={ItemListCSS.list}>
                    <thead>
                        <tr>
                            <th onClick={props.sortByCategory}>
                                קטגוריה{" "}
                                <img
                                    className={ItemListCSS.sort_icon}
                                    src={sortIcon}
                                ></img>
                            </th>
                            <th>שם מוצר</th>
                            <th>כמות</th>
                            <th onClick={props.sortByPrice}>
                                מחיר ליחידה{" "}
                                <img
                                    className={ItemListCSS.sort_icon}
                                    src={sortIcon}
                                ></img>
                            </th>
                            <th onClick={props.sortByTotalPrice}>
                                מחיר עבור מוצר{" "}
                                <img
                                    className={ItemListCSS.sort_icon}
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
                    className={ItemListCSS.total_cost_icon}
                ></img>
                <p>עלות כוללת: {totalCost}</p>
            </div>
        </div>
    );
}
