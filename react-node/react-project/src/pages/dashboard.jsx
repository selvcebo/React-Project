import './dashboard.css';
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';
import { logout } from '../utils'; 
import { useNavigate } from 'react-router-dom';
import CrudPanel from '../components/CrudPanel.jsx';

function Dashboard() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); 
    const handleMenuToggle = () => {
  setMenuOpen(prev => !prev);
};

  return (
    <div className="dashboard-container">
      <nav className="navbar">         
         
        <button onClick={handleMenuToggle} className="bm-burger-bars">☰</button>
        <ul className="navbar-list">
         
            <li></li>
            <li> <a href="/inicio" className="nav-items">Inicio</a></li>
            <li> <a href="/nosotros" className="nav-items">Nosotros</a></li>
            <li> <a href="/contacto" className="nav-items">Contacto</a> </li>
            <li> <button onClick={() => logout(navigate)} className="logout-button"> Cerrar sesión </button></li>
          </ul>
          </nav>
          <Menu customBurgerIcon={false} isOpen={menuOpen} onStateChange={({ isOpen }) => setMenuOpen(isOpen)}>
        <a className="menu-item" href="/inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
        <a className="menu-item" href="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a className="menu-item" href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
      </Menu>
      <div className="main-content">
   
        <div className="dashboard-container">
      <center><h1>📊 Panel de control</h1></center>
      <CrudPanel />
    </div>
      </div>
    </div>
  );
}

export default Dashboard;
