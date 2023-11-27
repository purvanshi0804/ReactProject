// Login.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faMale, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './login.css';



const Login = () => {
  
  const navigate = useNavigate();
  const { authToken, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [signupMessage, setSignupMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (!isLogin) {
      if (!firstName) {
        errors.firstName = 'First Name is required';
      }

      if (!lastName) {
        errors.lastName = 'Last Name is required';
      }

      if (!gender) {
        errors.gender = 'Gender is required';
      }

      if (!phone) {
        errors.phone = 'Phone is required';
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLogin){
      axios.get(`http://localhost:3001/posts?email=${email}& password=${password}`)
      .then(res=>{
        if(res.data.length > 0){
          alert("Logged in Successfully")
          navigate('/')
        }
        else{
          alert("Invalid Email or Password")
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else{
      axios.post(`http://localhost:3001/posts`,{
        email,password,firstName,lastName,gender,phone
      })
      .then(res=>{
        alert("Registered")
        navigate('/')
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <h1 className='heading'>{isLogin ? 'LOGIN' : 'SIGN UP'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <FontAwesomeIcon icon={faEnvelope} /> Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        {formErrors.email && <p className="error-message">{formErrors.email}</p>}

        <br />
        <label>
          <FontAwesomeIcon icon={faLock} /> Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        {formErrors.password && <p className="error-message">{formErrors.password}</p>}

        <br />
        {!isLogin && (
          <>
            <label>
              <FontAwesomeIcon icon={faUser} /> First Name:
              <input type="text" value={firstName} onChange={handleFirstNameChange} required />
            </label>
            {formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}

            <br />
            <label>
              <FontAwesomeIcon icon={faUser} /> Last Name:
              <input type="text" value={lastName} onChange={handleLastNameChange} required />
            </label>
            {formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}

            <br />
            <label>
              <FontAwesomeIcon icon={faMale} /> Gender:
              <select value={gender} onChange={handleGenderChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}

            <br />
            <label>
              <FontAwesomeIcon icon={faPhone} /> Phone:
              <input type="tel" value={phone} onChange={handlePhoneChange} required />
            </label>
            {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}

            <br />
          </>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {signupMessage && <p className="response-message">{signupMessage}</p>}
      <p onClick={toggleForm} className="toggle-btn">
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default Login

;
