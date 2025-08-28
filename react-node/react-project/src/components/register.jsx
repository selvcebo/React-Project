import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
        const res = await axios.post('http://localhost:4000/api/register', {
        username,
        email,
        password
        });

    if (res.status >= 200 && res.status < 300) {
    setSuccessMsg(res.data.mensaje || 'Registro exitoso');
    setTimeout(() => navigate('/'), 1500);
    }


} catch (err) {
  const errorMsgFromServer = err.response?.data?.error || 'Error al registrar';

  if (errorMsgFromServer.includes('password')) {
    setErrorMsg('La contraseña debe tener al menos 6 caracteres');
  } else if (errorMsgFromServer.includes('email')) {
    setErrorMsg('El correo no es válido o ya está registrado');
  } else if (errorMsgFromServer.includes('username')) {
    setErrorMsg('El nombre de usuario ya está en uso');
  } else {
    setErrorMsg(errorMsgFromServer);
  }
}

  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        <Link to="/" className="custom-link">¿Ya tienes cuenta? Inicia sesión</Link>
      </form>
    </div>
  );
}

export default Register;
