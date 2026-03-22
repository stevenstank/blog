import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome to admin panel.</p>
      <nav>
        <Link to="/new">Create New Post</Link>
      </nav>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}

export default Dashboard;
