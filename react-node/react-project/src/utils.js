export const logout = (navigate) => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('token'); // si usás JWT
  console.log("Sesión purificada. El aura técnica ha sido liberada.");
  navigate('/');
};