import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import Cookies from "universal-cookie/lib";
import './App.css';
import UsersList from './components/Users.js'
import IndexList from './components/index.js'
import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter, HashRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ToDoProjectList from "./components/ToDoProject";
import LoginForm from './components/Auth.js'
import ToDoProject from "./components/ToDoProject";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

// const Menu = () => (
//
// );

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://89.108.78.168:8000/api/todo/${id}`, {headers}).then(
            response => {
                // this.setState(
                //     {
                //         'books': this.state.books.filter((item) => item.id !==id)
                //     }
                // )

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    createTodo(projectName, text, user) {
        const headers = this.get_headers()
        const data = {project_name: projectName, text: text, user: user}
        axios.post(`http://89.108.78.168:8000/api/todo/`, data, {headers}).then(
            response => {
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://89.108.78.168:8000/api/project/${id}`, {headers}).then(
            response => {
                // this.setState(
                //     {
                //         'books': this.state.books.filter((item) => item.id !==id)
                //     }
                // )
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createProject(projectName, url, user) {
        const headers = this.get_headers()
        const data = {project_name: projectName, url: url, users: user}
        // console.log(projectName)
        console.log(data)
        axios.post(`http://89.108.78.168:8000/api/project/`, data, {headers}).then(
            response => {

                // let new_book = response.data
                // const  author = this.state.authors.filter((item) => item.id === new_book.author)[0]
                // new_book.author = author
                // this.setState({books: [...this.setState.books,new_book]})
                //

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })


    }

    set_username(username) {
        const cookies = new Cookies()
        cookies.set('username', username)
        this.setState({'username': username})
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.setState({'users': []})
        this.setState({'projects': []})
        this.setState({'todos': []})
        this.setState({'username': ''})
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token}, () => this.load_data())
        this.setState({'username': username})
    }


    get_token(username, password) {

        axios.post('http://89.108.78.168:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
                this.set_username(username)
                // console.log(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://89.108.78.168:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://89.108.78.168:8000/api/project', {headers})
            .then(response => {
                const projects = response.data
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://89.108.78.168:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                // console.log(todos[0].isActive)
                this.setState(
                    {
                        'todos': todos.filter((item) => item.isActive === true)
                    }
                )
                // console.log(this.state.todos)
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',

        }

        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()

    }


    render() {
        return (
            <div className="body">
                <Header/>
                <BrowserRouter>
                    {/*<Menu/>*/}
                    <ul id="navbar">
                        <li><Link to='/projects'>Список проектов</Link></li>
                        <li><Link to='/users'>Пользователи</Link></li>
                        <li><Link to='/todo'>Список задач</Link></li>
                        <li>
                            {this.is_auth() ? <div className="login_name"> {this.state.username + ' '}
                                    <button onClick={() => this.logout()}> Выйти
                                    </button>
                                </div> :
                                <Link to='/login'> Войти</Link>}
                        </li>

                    </ul>
                    <div className="main">
                        <Switch>
                            {/*<ProjectList projects={this.state.projects}/>*/}
                            <Route exact path='/' component={() => <IndexList/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}
                                                                 deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/projects/create'
                                   component={() => <ProjectForm user={this.state.users}
                                             createProject={(projectName, url, user) => this.createProject(projectName, url, user)}/>}/>
                            <Route exact path='/users' component={() => <UsersList users={this.state.users}/>}/>
                            <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos}
                                                                                 deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route exact path='/todo/create' component={() =>
                                <TodoForm user={this.state.users} project={this.state.projects}
                                             createTodo={(projectName, text, user) => this.createTodo(projectName, text, user)}/>}/>
                            <Route path='/todo/:projectName'>
                                <ToDoProjectList projects={this.state.projects} todos={this.state.todos}/>
                            </Route>
                            {this.is_auth() ? <Redirect from='/login' to='/'/> :

                                <Route exact path='/login' component={() => <LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>}/>}


                            <Redirect from='/' to='/users'/>
                            <Route component={NotFound404}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}


export default App;
