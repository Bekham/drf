import React from 'react'
import {Link} from 'react-router-dom'

const ToDoItem = ({todo, deleteTodo}) => {
    return (

        <tr>
            <td><Link to={`todo/${todo.projectName}`}>{todo.projectName}</Link></td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>
                    Удалить
                </button>
            </td>
        </tr>

    )
}

const ToDoList = ({todos, deleteTodo}) => {
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
                <th>
                    Удалить
                </th>

                {todos.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteTodo}/>)}
                {/*'books': this.state.books.filter((item) => item.id !==id)*/}
                {/* {this.props.project.map((item) => <option value={item.projectName}>{item.projectName}</option>)}*/}
            </table>
            <button id="create_button" type='button'>
                    <Link id="link_decor" to='/todo/create'>Создать Задание</Link>
                </button>
        </div>
    )
}


export default ToDoList