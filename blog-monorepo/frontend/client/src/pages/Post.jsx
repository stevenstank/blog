import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + '/posts/' + id);

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data.post || null);
      } catch (err) {
        setError('Could not load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <p>Post not found.</p>
        <Link to="/">Back to Home</Link>
      </main>
    );
  }

  return (
    <main>
      <article className="post-card">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default Post;
