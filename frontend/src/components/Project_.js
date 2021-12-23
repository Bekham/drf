import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>
                    Удалить
                </button>
            </td>
        </tr>

    )
}


const ProjectList = ({projects, deleteProject}) => {
    let searchItem
    // console.log(users)
    return (
        <div>
            <h3 className="table_name">Проекты</h3>
            <div className="login_name">
                    <label htmlFor="login">Поиск  </label>
                    <input type="text" className="form-control" name="url" value={searchItem}
                           onChange={console.log(searchItem)}/>
                </div>
            <table>
                <th>
                    Название
                </th>
                <th>
                    URL Проекта
                </th>
                <th>
                    Пользователи
                </th>
                <th>
                    Удалить
                </th>
                {/*this.state.books.filter((item) => item.id !==id)*/}
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <button id="create_button" type='button'>
                    <Link id="link_decor" to='/projects/create'>Создать Проект</Link>
                </button>

        </div>
    )
}


export default ProjectList