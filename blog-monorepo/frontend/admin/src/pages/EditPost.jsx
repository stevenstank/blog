import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + '/posts/' + id);

        if (!response.ok) {
          throw new Error('Failed to load post');
        }

        const data = await response.json();
        setTitle(data.post?.title || '');
        setContent(data.post?.content || '');
      } catch (err) {
        setMessage('Could not load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');
      const token = localStorage.getItem('token');
      const response = await fetch(API_BASE_URL + '/posts/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      setMessage('Post updated successfully.');
    } catch (err) {
      setMessage('Could not update post.');
    }
  };

  if (loading) {
    return <p>Loading post...</p>;
  }

  return (
    <main>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <button type="submit">Update</button>
      </form>

      {message ? <p>{message}</p> : null}
    </main>
  );
}

export default EditPost;
