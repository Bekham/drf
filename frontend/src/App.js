import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import UsersList from './components/Users.js'
import Footer from "./components/Footer";
import Header from "./components/Header";

// const Header = () => (
//     <h3 className="header">
//         Проект TO DO
//     </h3>
// );

// const Footer = () => (
//     <footer className="footer">
//         <p>GeekBrains 2021</p>
//     </footer>
// );

const Menu = () => (
    <ul id="navbar">
      <li><a href="#">Главная</a></li>
      <li><a href="#">Пользователи</a></li>
      <li><a href="#">Список дел</a></li>
      <li><a href="#">О нас</a></li>
    </ul>
);


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
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

    }


    render() {
        return (
            <div className="body">
                <Header/>
                <Menu/>
                <div className="main">
                    <h3 className="table_name">Пользователи</h3>
                    <UsersList users={this.state.users}/>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default App;
