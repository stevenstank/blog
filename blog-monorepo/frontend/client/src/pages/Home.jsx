import { useEffect, useState } from 'react';
import PostList from '../components/PostList';

const API_BASE_URL = 'http://localhost:5000';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + '/posts');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError('Could not load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Published Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}

export default Home;
