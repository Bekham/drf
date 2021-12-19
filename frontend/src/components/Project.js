import React from 'react'
import {Link} from 'react-router-dom'

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            search: [],
        }
    }

    project_item(project) {
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
                    <button onClick={() => this.props.deleteProject(project.id)} type='button'>
                        Удалить
                    </button>
                </td>
            </tr>

        )
    }

    handleChange(event) {
        // console.log(event.target.value, event.target.name)
        this.setState(
            {
                searchName: event.target.value
            }
        )



    }

    handleSubmit(event) {
        console.log(this.state.searchName)

        if (this.state.searchName.length > 0) {
            const searchList = this.props.projects.filter(project => project.projectName.includes(this.state.searchName))
            this.setState({
                'search': searchList
            })
            console.log(this.state.search)
            console.log(searchList)
        } else {
            this.setState({
                'search': []
            })
        }
        // this.props.projects = this.state.search
        event.preventDefault()
    }


    render() {
        // console.log(this.props.projects)
        return (
            <div>
                <h3 className="table_name">Проекты</h3>
                <form className="login_name" onSubmit={(event) => this.handleSubmit(event)}>

                    <div className="login_name">
                        <label htmlFor="search">Поиск </label>
                        <input type="text" name="searchName" value={this.state.searchName}
                               onChange={(event) => this.handleChange(event)}/>

                        <input type="submit" value="Найти"/>
                    </div>

                </form>
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
                    {this.state.search.length > 0 && this.state.search.map((project) => this.project_item(project))}
                    {this.state.search.length === 0 && this.props.projects.map((project) => this.project_item(project))}
                </table>
                <button id="create_button" type='button'>
                    <Link id="link_decor" to='/projects/create'>Создать Проект</Link>
                </button>

            </div>
        )
    }
}

//
//
// const ProjectList = ({projects, deleteProject}) => {
//     let searchItem
//     // console.log(users)
//
// }


export default ProjectList