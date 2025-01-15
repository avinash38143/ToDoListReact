import React, { useState } from 'react'
import styles from './Register.module.css';
import login from '../../assets/login.png'
import {Input, Button, message} from 'antd'
import { Link, useNavigate } from 'react-router';
import { getErrorMessage } from '../../util/GetError'; 
import AuthServices from '../../services/authServices';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =async () => {
    try{
      setLoading(true);
      const data = {
        firstname,
        lastname,
        username,
        password
      }
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("Registered Successfully");
      navigate('/login');
    }catch(err){
      console.log(err);
      message.error("Enter the valid value");
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  }
  return (
    <div>
      <div className={styles.login__card}>
        <img src={login} alt="..." />
        <h2>Register</h2>
        <div className={styles.input__inline__wrapper}>
          <Input 
          placeholder='Enter Your First name' 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} />

          <Input 
          placeholder='Enter Your Last name' 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className={styles.input__wrapper}>
          <Input 
          placeholder='Enter Your Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.input__wrapper}>
          <Input.Password
          placeholder='Enter Your Password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={styles.input__info}>
          Existing User? <Link to="/Login">Login</Link>
        </div>
        <Button loading={loading} type="primary" size="large" disabled={!username || !password} onClick={handleSubmit}>Register</Button>
      </div>
    </div>
  )
}

export default Register