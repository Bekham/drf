import React from 'react'


const UserItem = ({user}) => {
    return (

        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    // console.log(users)
    return (
        <div>
            <h3 className="table_name">Пользователи</h3>
            <table>

                <th>
                    Username
                </th>
                <th>
                    Имя
                </th>
                <th>
                    Фамилия
                </th>
                <th>
                    Email
                </th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </div>
    )
}


export default UsersList