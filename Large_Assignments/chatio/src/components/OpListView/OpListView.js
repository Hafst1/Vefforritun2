import React from 'react';
import OpListViewItem from '../OpListViewItem/OpListViewItem';
import PropTypes from 'prop-types';

const OpListView = (props) => {
  return (
    <div>
      <h6><strong>OP LIST</strong></h6>
      {
        Object.keys(props.ops).map((keyName, keyIndex) => <OpListViewItem key={keyIndex} op={props.ops[keyName]} room={props.room} />)
      }
    </div>
  );
}

OpListView.propTypes = {
  // Object containing the ops of the room, required.
  ops: PropTypes.object.isRequired,
  // String containing the name of the room, required.
  room: PropTypes.string.isRequired
}

OpListView.defaultProps = {
  // Room contains no ops by default.
  ops: {},
  // Room name is 'chatroom' on default.
  room: 'chatroom'
}


export default OpListView; 