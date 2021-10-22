import React, {useEffect} from 'react';
import axios from 'axios';

const Users = () => {

    useEffect(() => {

        const body = {};
        const headers = { 
            'Content-Type': 'application/json'
        };
        axios.get('http://localhost:3001/users', body, { headers })
        .then(response => {
            console.log(response);
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
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Users;