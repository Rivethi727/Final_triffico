import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
 import '../../Admin1/User/CreateUser'
import Sidebar from "../Sidebar";



function Users() {
    const {id} = useParams()
      const [data, setData] = useState([])
      const navigate = useNavigate()
      useEffect(()=> {
        axios.get('http://localhost:4500/api/admin/users')
        .then(res => {
            console.log(res);
          setData(res.data);
        })
        .catch(err => console.log(err));
      }, [])
    const handleDelete = (id) => {
        axios.delete('http://localhost:4500/api/admin/user/'+id)
        .then(res => {
            console.log(res)
            navigate('/admin')
        }).catch(err => console.log(err))
    }
  return (
  //  <>
  //  <CreateUser />
  <div className="row">
  <div className="col-12 col-md-2">
     <Sidebar/>
     </div>
     <div className="col-12 col-md-10">
    <div className="p-3">
     
      <div className=" bg-white rounded p-3">
        <Link to="/admin/createUser" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th style={{ fontSize: '20px' }}>firstName</th>
              <th style={{ fontSize: '20px' }}>Email</th>
              <th style={{ fontSize: '20px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((user, index) => {
                    return <tr key={index}>
                        <td style={{ fontSize: '20px' }}>{user.firstName}</td>
                        <td style={{ fontSize: '20px' }}>{user.email}</td>
                        <td>
                            <Link to={`/admin1/users/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}
export default Users;



