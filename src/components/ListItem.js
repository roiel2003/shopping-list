import React from "react";
import deleteIcon from "../assets/delete_icon.svg"
import styles from "./ListItem.module.css"

export default function ListItem(props) {
    const item = props.item;

    return (
        <tr>
            <td>{item.category}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.price * item.quantity}</td>
            <td className={styles.delete_icon_box}><img src={deleteIcon} className={styles.delete_icon} onClick={() => props.itemDelete(item.key)}></img></td>
        </tr>
    );
}
