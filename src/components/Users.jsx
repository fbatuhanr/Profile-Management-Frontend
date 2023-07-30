import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Buffer } from 'buffer';


const Users = () => {

    const userInfo = useSelector(state => state.user_info);

    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
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
                setUsers(responseData);

                setIsUsersLoaded(true);

                setTimeout(() => {
                    console.log("users:", users);
                }, 2000);
            })
            .catch(error => {
                console.log("err:", error);
            });

    }, []);

    return (
        <div className="mt-4 p-2 bg-white rounded">
            {
                isUsersLoaded ?  
                <table className="table table-hover">
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
                                <th key={inx} scope="row" className="pt-3 pb-3 ps-2">{inx+1}</th>
                                <td>{user.img && <img src={(`data:${user.img.contentType};base64, ${Buffer.from(user.img.data.data).toString('base64')}`)} width="auto" height="75px" className="d-block border border-1 border-success rounded-circle" alt="" />}</td>
                                <td>{user.email}</td>
                                <td>{user.name} - {user.surname}</td>
                                <td>{user.country}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
                : 
                <div class="loading-spinner p-5 text-center"><div class="spinner-border text-success" style={{width:'4rem', height:'4rem'}} role="status"><span class="sr-only"></span></div></div>
            }
        </div >
    )
}
export default Users;