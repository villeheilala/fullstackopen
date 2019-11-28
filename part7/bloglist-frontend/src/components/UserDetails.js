/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const UserDetails = ({ id }) => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  // eslint-disable-next-line no-shadow
  const user = users.find((user) => user.id === id);

  if (user === undefined) {
    return null;
  }

  return (
    <div>
      <h2>Blogs by user</h2>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogs.filter((blog) => blog.user._id === id)
          .map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

UserDetails.propTypes = {
  id: PropTypes.string,
};

UserDetails.defaultProps = {
  id: '23787sgd872',
};

export default UserDetails;
