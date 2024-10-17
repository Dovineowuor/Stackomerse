import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access userLogin state from Redux store
  const userLogin = useSelector(state => state.userLogin || {});
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // Redirect if user is logged in
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Sign In</h1>

      {/* Error handling */}
      {error && (
        <div className="alert alert-danger">
          {typeof error === 'string' ? error : error.message || 'An error occurred'}
        </div>
      )}

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button href="http://localhost:5000/api/user/login" type="submit" className="btn btn-primary mt-3">
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

LoginPage.propTypes = {
  userLogin: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    userInfo: PropTypes.object,
  }),
};

export default LoginPage;
