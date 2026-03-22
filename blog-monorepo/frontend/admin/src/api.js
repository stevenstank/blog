const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const buildHeaders = (headers = {}, hasBody = false) => {
  const token = localStorage.getItem('token');

  return {
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
};

const parseResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
};

const request = async (path, options = {}) => {
  const hasBody = typeof options.body !== 'undefined';
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers, hasBody),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data;
};

const getPosts = () => request('/posts');

const getPostById = (id) => request(`/posts/${id}`);

const login = ({ email, password }) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

const createPost = ({ title, content }) =>
  request('/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
  });

const updatePost = (id, { title, content }) =>
  request(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
  });

export { BASE_URL, getPosts, getPostById, login, createPost, updatePost };
