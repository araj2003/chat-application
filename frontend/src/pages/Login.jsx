import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginRoute } from '../utils/url';
import axios from 'axios';
import { useContext } from 'react'
import { userContext } from '../../context/userContext'

const Login = () => {
  const {isLogin,setIsLogin} = useContext(userContext)
  const navigate = useNavigate();
  const [data, setData] = useState({
    user_name: "",
    password: "",
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  

  const handleValidation = () => {
    const { password, user_name} = data;
    if (password === '') {
      toast.error(
        "email and password is required",
        toastOptions
      );
      return false;
    } else if (user_name === '') {
      toast.error(
        "email and password is required",
        toastOptions
      );
      return false;
    } 

    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { user_name, password } = data;
        const response = await axios.post(LoginRoute, {
          user_name,
          password,
        });
  
        const responseData = response.data;
  
        if (responseData.status === false) {
          toast.error(responseData.msg, toastOptions);
        }
  
        if (responseData.status === true) {
          setIsLogin(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An unexpected error occurred.", toastOptions);
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>User_Name</label>
        <input
          type="text"
          placeholder='Enter your username'
          min="3"
          value={data.user_name}
          onChange={(e) => setData({ ...data, user_name: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder='Enter your password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type='submit'>Login</button>
        <span>do not have an account? <Link to="/register">Register</Link></span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
