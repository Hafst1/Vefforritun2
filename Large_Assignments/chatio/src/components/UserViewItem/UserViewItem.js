import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserViewItem extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Link to={`/${user}`} >{user}</Link>
    );
  };
};

UserViewItem.propTypes = {
  // String containing the name of the user, required.
  user: PropTypes.string.isRequired
}

UserViewItem.defaultProps = {
  // Name of the user is 'John Doe' on default.
  user: 'John Doe'
}

export default UserViewItem;