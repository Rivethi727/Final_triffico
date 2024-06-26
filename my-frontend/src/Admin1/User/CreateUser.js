import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateUser() {
    const [firstName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('${process.env.REACT_APP_URL}/api/admin1/users', { firstName, email, password })
        .then(res => {
            console.log(res);
            navigate('/admin1');
        })
        .catch(err => console.log(err));
    }
    const handleCancel = () => {
      navigate("/admin1"); // Navigate back to the admin page
  };
  return (
    <div className="d-flex vh-50  justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">firstName</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={firstName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
          {/* <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button> */}
        </form>
      </div>
    </div>
  );
}
export default CreateUser;