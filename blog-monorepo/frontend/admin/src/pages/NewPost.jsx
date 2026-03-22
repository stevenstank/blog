import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage('');
      const token = localStorage.getItem('token');

      const response = await fetch(API_BASE_URL + '/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setTitle('');
      setContent('');
      setMessage('Post created successfully.');
    } catch (err) {
      setMessage('Could not create post.');
    }
  };

  return (
    <main>
      <h1>Create Post</h1>
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

        <button type="submit">Create</button>
      </form>

      {message ? <p>{message}</p> : null}
    </main>
  );
}

export default NewPost;
