import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users,setUsers]=useState([]);

    const {id}=useParams

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers = async() => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    }

    const deleteUser=async (id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <h2>Users</h2>
            <table className="table table-success table-striped shadow">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index)=> (
                            <tr>
                                <th scope="row" key={index}>{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2"
                                      to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mx-2" 
                                      to={`/edituser/${user.id}`}>Edit</Link>
                                    <button className="btn btn-danger mx-2" 
                                      onClick={() =>
                                       {if(window.confirm('Are you sure you want to Delete this item?'))
                                       {deleteUser(user.id);}}}>Delete</button>
                                </td>
                            </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
