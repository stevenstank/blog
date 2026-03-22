import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteCommentById,
  deletePost,
  getAdminPosts,
  getCommentsByPostId,
  togglePostPublish,
} from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentsByPost, setCommentsByPost] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getAdminPosts();
        const loadedPosts = data.posts || [];
        setPosts(loadedPosts);

        const commentEntries = await Promise.all(
          loadedPosts.map(async (post) => {
            try {
              const commentData = await getCommentsByPostId(post.id);
              return [post.id, commentData.comments || []];
            } catch (error) {
              return [post.id, []];
            }
          })
        );

        setCommentsByPost(Object.fromEntries(commentEntries));
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

  const handleDeleteDraft = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this draft?');
    if (!confirmed) {
      return;
    }

    try {
      setMessage('');
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setCommentsByPost((prevComments) => {
        const nextComments = { ...prevComments };
        delete nextComments[postId];
        return nextComments;
      });
    } catch (error) {
      setMessage('Could not delete draft post.');
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      setMessage('');
      await deleteCommentById(commentId);
      setCommentsByPost((prevComments) => ({
        ...prevComments,
        [postId]: (prevComments[postId] || []).filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      setMessage('Could not delete comment.');
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
                <button type="button" onClick={() => handleEditPost(post.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleTogglePublish(post.id)}>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                {!post.published ? (
                  <button type="button" onClick={() => handleDeleteDraft(post.id)}>
                    Delete
                  </button>
                ) : null}

                <section>
                  <h4>Comments</h4>
                  {(commentsByPost[post.id] || []).length === 0 ? <p>No comments.</p> : null}
                  {(commentsByPost[post.id] || []).length > 0 ? (
                    <ul>
                      {(commentsByPost[post.id] || []).map((comment) => (
                        <li key={comment.id}>
                          <p>{comment.content}</p>
                          <p>By: {comment.authorName || 'Anonymous'}</p>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(post.id, comment.id)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </article>
            ))
          : null}
      </section>

      {message ? <p>{message}</p> : null}
    </main>
  );
}

export default Dashboard;
