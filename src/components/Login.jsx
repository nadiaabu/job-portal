import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      alert('Login Successful!');
      navigate('/'); 
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Login to Job Portal</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ background: '#2563eb', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;