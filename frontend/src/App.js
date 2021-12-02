import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import UsersList from './components/Users.js'
import IndexList from './components/index.js'
import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter, HashRouter, Link, Redirect, Route, Switch} from 'react-router-dom'
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ToDoProjectList from "./components/ToDoProject";

const Menu = () => (
    <ul id="navbar">
        <li><Link to='/projects'>Список проектов</Link></li>
        <li><Link to='/users'>Пользователи</Link></li>
        <li><Link to='/todo'>Список задач</Link></li>
    </ul>
);

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
            'todo': [],
        }
    }

    componentDidMount() {
        // const users = [
        //     {
        //         'username': 'Ivan',
        //         'first_name': 'Иван',
        //         'last_name': 'Иванов',
        //         'email': 'ivan@mail.ru'
        //     },
        //     {
        //         'username': 'Petr',
        //         'first_name': 'Петр',
        //         'last_name': 'Петро',
        //         'email': 'petr@mail.ru'
        //     },
        // ]
        // this.setState(
        //     {
        //         'users': users
        //     }
        // )
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data

                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data
                // console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div className="body">
                <Header/>
                <BrowserRouter>
                    <Menu/>

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
