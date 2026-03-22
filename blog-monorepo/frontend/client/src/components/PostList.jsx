import { Link } from 'react-router-dom';

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>No published posts found.</p>;
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-card">
          <h2>
            <Link to={'/post/' + post.id}>{post.title}</Link>
          </h2>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
