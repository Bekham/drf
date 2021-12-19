import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        // console.log(this.state.login + ' ' + this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="main">
                    <div>
                        <h3 className="table_name">Авторизация</h3>
                        <input type="text" name="login" placeholder="login" value={this.state.login}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" value={this.state.password}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <input type="submit" value="Войти"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default LoginForm