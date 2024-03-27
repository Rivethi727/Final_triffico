import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../styles/login.css'


const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_URL}/api/v1/auth`;
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
      localStorage.setItem("email", data.email);
			
      toast.success("Login Success!"); 
        setTimeout(() => {
        window.location = "/";
      }, 1000);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        toast.error(error.response.data.message);
				setError(error.response.data.message);
			}
		}
	};

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Login;
