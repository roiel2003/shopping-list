import React from "react";

export default function ListItem(props) {
    const item = props.item;

    return (
        <tr>
            <td>{item.category}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.price * item.quantity}</td>
        </tr>
    );
}
