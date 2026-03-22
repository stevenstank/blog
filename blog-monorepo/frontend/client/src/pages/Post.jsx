import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      setMessage('Comment is required.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage('');

      const response = await fetch(`${API_BASE_URL}/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          authorName: authorName.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setAuthorName('');
      setContent('');
      setMessage('Comment submitted.');
    } catch (submitError) {
      setMessage('Could not submit comment.');
    } finally {
      setSubmitting(false);
    }
  };

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

      <section className="post-card">
        <h2>Leave a Comment</h2>
        <form onSubmit={handleSubmitComment}>
          <div>
            <label htmlFor="authorName">Name (optional)</label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="commentContent">Comment</label>
            <textarea
              id="commentContent"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {message ? <p>{message}</p> : null}
      </section>

      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default Post;
