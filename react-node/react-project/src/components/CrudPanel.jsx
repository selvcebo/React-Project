import { useState, useEffect } from 'react';
import axios from 'axios';
import './CrudPanel.css';

const CrudPanel = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });

  useEffect(() => {
    axios.get('http://localhost:4000/api/users')
      .then(res => setUsers(res.data));
  }, []);

  const handleCreate = () => {
    axios.post('http://localhost:4000/api/users', formData)
      .then(res => setUsers([...users, res.data]));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u._id !== id)));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:4000/api/users/${id}`, formData)
      .then(res => {
        const updated = users.map(u => u._id === id ? res.data : u);
        setUsers(updated);
      });
  };

  return (
    <div className="crud-panel-div">
      <h2 className="crud-panel-h2">🔧 Gestión de usuarios</h2>
      <input placeholder="Username" className='crud-panel-input' value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })} />
      <input placeholder="Email" className='crud-panel-input' value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" className='crud-panel-input' placeholder="Contraseña" value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
      <select value={formData.role} className='crud-panel-select'
        onChange={e => setFormData({ ...formData, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className='crud-panel-button' onClick={handleCreate}>Crear</button>

      <ul className="crud-panel-ul"> 
        {users.map(user => (
          <li key={user._id} className="crud-panel-li">
            {user.username} ({user.role})
            <button onClick={() => handleUpdate(user._id)}>Actualizar</button>
            <button onClick={() => handleDelete(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudPanel;
