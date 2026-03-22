import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminPosts, togglePostPublish } from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getAdminPosts();
        setPosts(data.posts || []);
      } catch (error) {
        setMessage('Could not load posts.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTogglePublish = async (postId) => {
    try {
      setMessage('');
      const data = await togglePostPublish(postId);
      const updatedPost = data.post;

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      setMessage('Could not update publish status.');
    }
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

      <section>
        <h2>Posts</h2>
        {loading ? <p>Loading posts...</p> : null}
        {!loading && posts.length === 0 ? <p>No posts found.</p> : null}
        {!loading
          ? posts.map((post) => (
              <article key={post.id}>
                <h3>{post.title}</h3>
                <p>Status: {post.published ? 'Published' : 'Draft'}</p>
                <button type="button" onClick={() => handleTogglePublish(post.id)}>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
              </article>
            ))
          : null}
      </section>

      {message ? <p>{message}</p> : null}
    </main>
  );
}

export default Dashboard;
