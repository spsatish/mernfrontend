import React, { useState } from 'react';
import '../styles/Authentication.css';  
import logo from '../assets/qb2.png';  

const Authentication = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reenterPasswordError, setReenterPasswordError] = useState('');
  const [formError, setFormError] = useState(''); 

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!emailValue.includes('@')) {
      setEmailError('Invalid email address, "@" symbol is required');
    } else if (!emailValue.includes('.')) {
      setEmailError('Invalid email address, "." symbol is required');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const symbolPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (passwordValue.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!symbolPattern.test(passwordValue)) {
      setPasswordError('Password must contain at least one symbol');
    } else {
      setPasswordError('');
    }
  };

  const handleReenterPasswordChange = (e) => {
    const reenterPasswordValue = e.target.value;
    setReenterPassword(reenterPasswordValue);

    if (reenterPasswordValue !== password) {
      setReenterPasswordError('Passwords do not match');
    } else {
      setReenterPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailError && !passwordError && (!isSignup || !reenterPasswordError) && email && password) {
      try {
        const response = await fetch(isSignup ? 'http://localhost:5000/signup' : 'http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Form submitted successfully:', data);
          window.location.href = '/dashboard';
        } else {
          if (data.message === 'User does not exist') {
            setFormError('New user? Please sign up first.');
          } else {
            setFormError(data.message || 'An error occurred');
          }
        }
      } catch (error) {
        console.error('Error occurred during fetch:', error);
        setFormError('An error occurred. Please try again later.');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right-side">
        <div className="form-container">
          {!isSignup ? (
            <>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <p className="error">{emailError}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && <p className="error">{passwordError}</p>}
                <button type="submit">Login</button>
                {formError && <p className="form-error">{formError}</p>} {/* Display form errors */}
              </form>
              <p className="toggle-message">
                Don't have an account?{' '}
                <button onClick={toggleForm} className="toggle-button">
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <p className="error">{emailError}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && <p className="error">{passwordError}</p>}
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  value={reenterPassword}
                  onChange={handleReenterPasswordChange}
                  required
                />
                {reenterPasswordError && <p className="error">{reenterPasswordError}</p>}
                <button type="submit">Sign Up</button>
                {formError && <p className="form-error">{formError}</p>} {/* Display form errors */}
              </form>
              <p className="toggle-message">
                Already have an account?{' '}
                <button onClick={toggleForm} className="toggle-button">
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
