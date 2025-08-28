import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        email,
        password
      });

      if (res.status === 200 || res.data.mensaje?.includes("Login exitoso")) {
        setSuccessMsg('Inicio de sesión exitoso');
        localStorage.setItem('userRole', res.data.role);

        setTimeout(() => {
          if (res.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/inicio');
          }
        }, 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <div className="project-container-login">
        <h1>Proyecto React SELV</h1>
      </div>
      
      
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        <Link to="/register" className="custom-link">¿No tienes cuenta? Regístrate aquí</Link>
      </form>
    </div>
  );
}

export default Login;
