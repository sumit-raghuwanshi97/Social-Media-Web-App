import React from 'react';
import { useState } from 'react';
import './Login.css';
import  { useDispatch } from 'react-redux'
import { loginUser } from '../../Actions/User';
import axios from 'axios';

const Login = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const dispatch  = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email,password));
  }
  
  return (
    <div className='login'>
      <form className='loginForm' onSubmit={loginHandler}>
        
        <input type="email"
         required
         placeholder='Enter your email'
         value = {email}
         onChange = {(e) => setEmail(e.target.value)}
        ></input>

        <input type="password"
         required
         placeholder='Enter your password'
         value = {password}
         onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit"
        >Log In</button>

      </form>
    </div>
  )
}

export default Login;
