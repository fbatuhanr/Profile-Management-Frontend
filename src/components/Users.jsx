import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Users = () => {

    const userInfo = useSelector(state => state.user_info);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:3001/users')
        .then(response => {
            // // console.log(response.data);
            // console.log(Object.entries(response.data));
            // setUsers(Object.entries(response.data));
            // console.log(Object.entries(Object.entries(response.data)));
            // setUsers([...users, Object.entries(response.data)]);
            // setTimeout(() => {
            //     console.log(users);
            // }, 1000);
            const responseData = response.data;
            console.log(responseData);
            setUsers(responseData);
            setTimeout(() => {
                console.log("users:",users);
            }, 1000);
        })
        .catch(error => {
            console.log("err:",error);
        });

    }, []);

    return (
        <div className="mt-4 p-2 bg-white rounded">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Photo</th>
                        <th scope="col">User</th>
                        <th scope="col">Name Surname</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                    {
                       users && users.map((user,inx) =>
                            <tr className={user.email == userInfo.loginEmail ? "table-primary" : null}>
                                <th scope="row" className="pt-3 pb-3 ps-2">{inx+1}</th>
                                <td>Photo</td>
                                <td>{user.email}</td>
                                <td>{user.name} - {user.surname}</td>
                                <td>{user.country}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Users;