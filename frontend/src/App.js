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

        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
                this.set_username(username)
                // console.log(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users',{headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project',{headers})
            .then(response => {
                const projects = response.data
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo',{headers})
            .then(response => {
                const todos = response.data
                console.log(response.data)
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, version=v2'
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
                            </button> </div> :
                                <Link to='/login'> Войти</Link>}
                        </li>

                    </ul>
                    <div className="main">
                        <Switch>
                            {/*<ProjectList projects={this.state.projects}/>*/}
                            <Route exact path='/' component={() => <IndexList/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/users' component={() => <UsersList users={this.state.users}/>}/>
                            <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos}/>}/>
                            <Route path='/todos/:projectName'>
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
