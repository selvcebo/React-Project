import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('userRole');
  const location = useLocation();

  if (!role) {
    console.warn(`⚠️ Sin rol detectado. Portal bloqueado en ${location.pathname}`);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    console.warn(`⛔ Rol "${role}" no autorizado para ${location.pathname}`);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  console.log(`✅ Acceso concedido a ${location.pathname} para rol "${role}"`);
  return children;
};

export default PrivateRoute;
