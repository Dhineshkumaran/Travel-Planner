import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: undefined,
      email: undefined,
      password: undefined
   });

   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();

   // Password validation function
   const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
   };

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
   };

   const handleClick = async e => {
      e.preventDefault();

      // Validate password before proceeding
      if (!validatePassword(credentials.password)) {
         alert("Password must be at least 8 characters long, contain uppercase and lowercase letters, and include a number.");
         return;
      }

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
         });
         const result = await res.json();

         if (!res.ok) alert(result.message);

         dispatch({ type: 'REGISTER_SUCCESS' });
         navigate('/login');
      } catch (err) {
         alert(err.message);
      }
   };

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};

export default Register;
