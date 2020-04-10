import React from 'react';
import BanListViewItem from '../BanListViewItem/BanListViewItem';
import PropTypes from 'prop-types';

const BanListView = (props) => {
  return (
    <div>
      <h6><strong>Users in exile</strong></h6>
      {
        Object.keys(props.banned).map((keyName, keyIndex) => <BanListViewItem key={keyIndex} banned={props.banned[keyName]} room={props.room} />)
      }
    </div>
  );
}

BanListView.propTypes = {
  // Object containing the banned users of the room, required.
  banned: PropTypes.object.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

BanListView.defaultProps = {
  // Object contains no banned users on default.
  banned: {},
  // Room name is 'chatroom' on default.
  room: 'chatrooom'
}

export default BanListView;