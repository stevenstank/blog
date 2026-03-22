import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import PostList from '../components/PostList';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
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
