import React from 'react'


/*const Menu = () => {
    return (
        <p class="menu">
            MENU
        </p>
    )
}


export default Menu;*/
const MenuItem = ({ item }) => {
    return (
        <li><a href="{item.url}">{item.name}</a></li>
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
