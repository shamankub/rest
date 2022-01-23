import React from 'react'
import { Link } from 'react-router-dom'


const MenuItem = ({ item }) => {
    return (
        <li><Link to={item.link}>{item.title}</Link></li>
    )
}

const MenuList = ({ menu }) => {
    return (
        <ul class="menu">
            {menu.map((item) => <MenuItem item={item} />)}
        </ul>
    )
}

export default MenuList;
