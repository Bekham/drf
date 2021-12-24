import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            url: '',
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
        console.log(event)
        if (!event.target.selectedOptions) {

            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        console.log(users)
        this.setState({
            'user': users
        })
    }


    handleSubmit(event) {
        this.props.createProject(this.state.projectName, this.state.url, this.state.user)

        event.preventDefault()
    }

    render() {
        return (
            <form className="login_name" onSubmit={(event) => this.handleSubmit(event)}>

                <div  className="login_name">
                    <label htmlFor="login">Название проекта  </label>
                    <input type="text" className="form-control" name="projectName" value={this.state.projectName}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="login_name">
                    <label htmlFor="login">Сссылка  </label>
                    <input type="text" className="form-control" name="url" value={this.state.url}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="login_name">
                    <label htmlFor="user">Пользователи  </label>

                    {/*<select className="form-control" name="user"*/}
                    {/*        onChange={(event) => this.handleAuthorChange(event)}>*/}
                    {/*    {this.props.user.map((item) =>*/}
                    {/*        <option value={item.id}>*/}
                    {/*            {item.username}*/}
                    {/*        </option>)}*/}


                    {/*</select>*/}

                    <select name="username" multiple onChange={(event) => this.handleUserChange(event)}>
                        {this.props.user.map((item) => <option value={item.username}>{item.username}</option>)}
                    </select>
                </div>
                <input id="create_button" type="submit" value="Сохранить"/>
            </form>
        );
    }


}

export default ProjectForm;