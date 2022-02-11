import React from 'react'
import { Link } from 'react-router-dom'


const TODOItem = ({ todo, deleteTODO }) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.updated}
            </td>
            <td>
                {todo.creator}
            </td>
            <td>
                <button onClick={() => deleteTODO(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}


const TODOList = ({ todos, deleteTODO }) => {
    return (
        <div>
            <table class="todolist">
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Created
                </th>
                <th>
                    Updated
                </th>
                <th>
                    Creator
                </th>
                <th></th>
                {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO} />)}
            </table>
            <Link to='/todos/create'>Create ToDo</Link>
        </div>
    )
}


export default TODOList
