import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([{

        }
    ]);

    useEffect(() => {

        const body = {};
        const headers = { 
            'Content-Type': 'application/json'
        };
        axios.get('http://localhost:3001/users', body, { headers })
        .then(response => {
            // // console.log(response.data);
            // console.log(Object.entries(response.data));
            // setUsers(Object.entries(response.data));
            console.log(Object.entries(Object.entries(response.data)));
            setUsers([...users, Object.entries(response.data)]);
            setTimeout(() => {
                console.log(users);
            }, 1000);
        })
        .catch(error => {
            console.log("err:",error);
        });

    }, []);

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Photo</th>
                        <th scope="col">User</th>
                        <th scope="col">Name Surname</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       users.map((user, inx) => {
                           <tr>
                               <th><h1>{user}</h1></th>
                           </tr>
                            // <tr>
                            //     <th scope="row">{inx}</th>
                            //     <td>Photo</td>
                            //     <td>{user.email}</td>
                            //     <td>{user.name} - {user.surname}</td>
                            //     <td>{user.country}</td>
                            // </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Users;