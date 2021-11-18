import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import UsersList from './components/Users.js'

const Header = () => (
    <h3 className="header">
        Пользователи
    </h3>
);

const Footer = () => (
    <footer className="footer">
        <p>GeekBrains 2021</p>
    </footer>
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
                <div className="main">
                    <UsersList users={this.state.users}/>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default App;