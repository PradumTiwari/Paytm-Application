import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
       
        body: JSON.stringify({ username, firstName, lastName, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate("/");
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="bg-slate-600 w-1/3 ml-[30%] mt-[10%] h-1/2 p-4">
      <h1 className="text-white text-2xl mb-4 ml-[40%]">Sign Up</h1>
      
      <p className="text-white font-semibold ml-[20%]">Enter Your Info to Create an Account</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="text-white block mb-1">First Name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="John" className="px-3 py-2 border rounded w-full" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="text-white block mb-1">Last Name</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Kumar" className="px-3 py-2 border rounded w-full" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="username" className="text-white block mb-1">Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="John@123" className="px-3 py-2 border rounded w-full" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-white block mb-1">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" className="px-3 py-2 border rounded w-full" />
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
        <p className="text-slate-300 font-medium mt-2">Already Have an Account? Sign In</p>
      </form>
    </div>
  );
}

export default Signup;
