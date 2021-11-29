import React from 'react'
import {useParams} from "react-router-dom";


const ToDoProjectItem = ({project}) => {
    return (

        <tr>
            <td>
                {project.projectName}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.users.map(item => (
                    <li>{item}</li>
                ))}
            </td>
        </tr>

    )
}

const ToDoProjectList = ({projects}) => {
    let {projectName} = useParams();
    let filtered_items = projects.filter((project) => project.projectName === projectName)
    return (
        <div>
            <h3 className="table_name">Проекты</h3>
            <table>
                <th>
                    Название проекта
                </th>
                <th>
                    URL проекта
                </th>
                <th>
                    Пользователи
                </th>
                {filtered_items.map((project) => <ToDoProjectItem project={project}/>)}
            </table>
        </div>
    )
}


export default ToDoProjectList