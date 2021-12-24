import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.project)
        this.state = {
            // projectName: props.project.projectName,
            projectName: [],
            text: '',
            // user: props.user.username,
            user: [],
        }
    }

    handleChange(event) {
        // console.log(event.target.value, event.target.name)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUserChange(event) {
        // console.log(event.target.selectedOptions)
        if (!event.target.selectedOptions) {

            this.setState({
                'user': []
            })
            return;
        }
        let user = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            user.push(event.target.selectedOptions.item(i).value)

        }

        this.setState({
            'user': user[0]
        })


    }

    handleProjectChange(event) {


        if (!event.target.selectedOptions) {

            this.setState({
                'projectName': []
            })
            return;
        }
        let project = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(event.target.selectedOptions.item(i).value)
        }

        this.setState({
            'projectName': project[0]
        })
    }


    handleSubmit(event) {
        this.props.createTodo(this.state.projectName, this.state.text, this.state.user)

        event.preventDefault()
    }

    render() {
        return (
            <form className="login_name" onSubmit={(event) => this.handleSubmit(event)}>

                <div className="login_name">
                    <label htmlFor="projectName">Название проекта </label>
                    <select name="projectName" onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.project.map((item) => <option value={item.projectName}>{item.projectName}</option>)}
                    </select>
                </div>
                <div className="login_name">
                    <label htmlFor="text">Описание </label>
                    <input type="text" className="form-control" name="text" value={this.state.url}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="login_name">
                    <label htmlFor="username">Пользователь </label>
                    <select name="username" onChange={(event) => this.handleUserChange(event)}>
                        {this.props.user.map((item) => <option value={item.username}>{item.username}</option>)}
                    </select>
                </div>
                <input id="create_button" type="submit" value="Сохранить"/>
            </form>
        );
    }


}

export default TodoForm;