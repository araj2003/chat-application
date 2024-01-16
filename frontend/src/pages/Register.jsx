import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Register = () => {
    const [data,setData] = useState({
        user_name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const toastOptions = {
        position:'bottom-right',
                autoClose:5000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
    }
    const handleValidation = () => {
        const {password,confirmPassword,email,user_name} = data
        if(password !== confirmPassword){
            toast.error(
                "password and confirm password should be same",
                toastOptions
            )
            return false;
        }
        else if(user_name.length < 3){
            toast.error(
                "Username should be greater than 3 charecters",
                toastOptions
            )
            return false;
        }
        else if(password < 8){
            toast.error(
                "password should be greater than or equal to 8 charecters",
                toastOptions
            )
            return false;
        }
        else if(email === ''){
            toast.error(
                "please provide email",
                toastOptions
            )
            return false;
        }
        return true;
    }
    const register = (e) => {
        e.preventDefault()
        handleValidation()
        console.log(data)
    }
  return (
    <div>
    <form onSubmit={register}>
        <label>User_Name</label>
        <input 
            type="text" 
            placeholder='Enter your username' 
            value={data.user_name} 
            onChange={(e) => setData({...data,user_name:e.target.value})}
        />
        <label>Email</label>
        <input 
            type="email" 
            placeholder='Enter your email' 
            value={data.email} 
            onChange={(e) => setData({...data,email:e.target.value})}
        />
        <label>Password</label>
        <input 
            type="password" 
            placeholder='Enter your password' 
            value={data.password} 
            onChange={(e) => setData({...data,password:e.target.value})}
        />
        <label>Confirm Password</label>
        <input 
            type="password" 
            placeholder='confirm password' 
            value={data.confirmPassword} 
            onChange={(e) => setData({...data,confirmPassword:e.target.value})}
        />
        <button type='submit'>Create User</button>
        <span>already have an acount ? <Link to= "/login">Login</Link></span>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Register