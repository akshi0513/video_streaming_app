import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { login, register } from '../api';
import './Auth.css';

const Auth = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [message, setMessage] = useState(''); // State for success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isRegister
        ? await register(form.username, form.email, form.password)
        : await login(form.email, form.password);
      
      loginUser(response.data.token);
      setMessage(isRegister ? 'Registered successfully!' : 'Logged in successfully!'); // Set success message
    } catch (error) {
      console.error('Authentication failed:', error.response?.data?.error);
      setMessage(error.response?.data?.error || 'Authentication failed.'); // Set error message
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input 
            type="text" 
            placeholder="Username" 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
          />
        )}
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setForm({ ...form, password: e.target.value })} 
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      {message && <p className="auth-message">{message}</p>} {/* Display message */}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </button>
    </div>
  );
};

export default Auth;
