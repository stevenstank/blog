import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../api';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        setCommentsLoading(true);

        const [postResponse, commentsResponse] = await Promise.all([
          fetch(BASE_URL + '/posts/' + id),
          fetch(BASE_URL + '/posts/' + id + '/comments'),
        ]);

        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }

        const postData = await postResponse.json();
        setPost(postData.post || null);

        if (commentsResponse.ok) {
          const commentData = await commentsResponse.json();
          setComments(commentData.comments || []);
        } else {
          setComments([]);
        }
      } catch (err) {
        setError('Could not load post.');
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    fetchPostAndComments();
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

      const response = await fetch(`${BASE_URL}/posts/${id}/comments`, {
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

      const data = await response.json();
      const createdComment = data.comment;
      if (createdComment) {
        setComments((prevComments) => [createdComment, ...prevComments]);
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

      <section className="post-card">
        <h2>Comments</h2>
        {commentsLoading ? <p>Loading comments...</p> : null}
        {!commentsLoading && comments.length === 0 ? <p>No comments yet.</p> : null}
        {!commentsLoading && comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>
                  <strong>{comment.authorName || 'Anonymous'}</strong>
                </p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default Post;
