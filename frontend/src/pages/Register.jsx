import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/url';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleValidation = () => {
    const { password, confirmPassword, user_name, email } = data;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastOptions
      );
      return false;
    } else if (user_name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const register = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { email, user_name, password } = data;
        const response = await axios.post(registerRoute, {
          user_name,
          email,
          password,
        });
  
        const responseData = response.data;
  
        if (responseData.status === false) {
          toast.error(responseData.msg, toastOptions);
        }
  
        if (responseData.status === true) {
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(responseData.user)
          );
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
      <form onSubmit={register}>
        <label>User_Name</label>
        <input
          type="text"
          placeholder='Enter your username'
          value={data.user_name}
          onChange={(e) => setData({ ...data, user_name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder='Enter your email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder='Enter your password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder='Confirm password'
          value={data.confirmPassword}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        />
        <button type='submit'>Create User</button>
        <span>already have an account? <Link to="/login">Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
