// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx'; // Asegúrate de que este sea el correcto
import Register from './components/register.jsx'; // Si aún no lo tienes, créalo en esa ruta
import Inicio from './pages/inicio.jsx'
import Contacto from './pages/contacto.jsx'
import Nosotros from './pages/nosotros.jsx'
import Dashboard from './pages/dashboard.jsx'
import PrivateRoute from './components/privateRoute.jsx';

function App() {
  return (
    
    <div className="app-container">
     
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/dashboard" element={
  <PrivateRoute allowedRole="admin"> <Dashboard /> </PrivateRoute> } />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
