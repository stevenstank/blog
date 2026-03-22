import { Link } from 'react-router-dom';

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>No published posts found.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={'/post/' + post.id}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
