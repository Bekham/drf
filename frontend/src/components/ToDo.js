import React from 'react'
import {Link, useParams} from 'react-router-dom'

const ToDoItem = ({todo}) => {
    return (

        <tr>
                <td><Link to={`todos/${todo.projectName.projectName}`}>{todo.projectName.projectName}</Link></td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
        </tr>

    )
}

const ToDoList = ({todos}) => {
    return (
         <div>
              <h3 className="table_name">ToDo</h3>
        <table>
            <th>
                Проект
            </th>
            <th>
                Описание задачи
            </th>
            <th>
                Пользователь
            </th>
            {todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
         </div>
    )
}


export default ToDoList