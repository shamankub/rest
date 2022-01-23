import React from 'react'


const TODOItem = ({ todo }) => {
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
        </tr>
    )
}


const TODOList = ({ todos }) => {
    return (
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
            {todos.map((todo) => <TODOItem todo={todo} />)}
        </table>
    )
}


export default TODOList
