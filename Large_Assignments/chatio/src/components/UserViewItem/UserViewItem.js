import React from 'react'
import { Link } from 'react-router-dom';

class UserViewItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
  render() {
    const {user} = this.props;
    return (
      <Link to={`/${user}`}>{user}</Link>
    )
  }
}

export default UserViewItem;