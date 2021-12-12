import React from 'react'


const ProjectItem = ({project}) => {
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

const ProjectList = ({projects}) => {
    // console.log(users)
    return (
        <div>
            <h3 className="table_name">Проекты</h3>
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
                {projects.map((project) => <ProjectItem project={project}/>)}
            </table>
        </div>
    )
}


export default ProjectList