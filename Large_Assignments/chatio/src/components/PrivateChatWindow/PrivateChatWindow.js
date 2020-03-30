import React from 'react';
import { socket } from '../../service/socketService';

class PrivateChatWindow extends React.Component {
  componentDidMount() {
    socket.on('recv_privatemsg', (fromUser, privMessageHistory) => {
      if (fromUser === this.props.match.params.userName) {
        this.setState({ ...this.state, privMessageHistory: privMessageHistory });
      }
    });
    socket.emit('privHistory', this.props.match.params.userName, (resp) => {
      if (resp) {
        console.log('Message history successfully received');
      }
      else {
        console.log('No recorded message history between the two users');
      }
    });
    socket.on('getHistory', privMessageHistory => {
      this.setState({ ...this.state, privMessageHistory: privMessageHistory });
    })
  };
  constructor(props) {
    super(props);
    this.state = {
      privMessageHistory: [],
      message: ''
    };
  };
  sendMessage(message) {
    if (message === '') { return false; }
    var msgObj = {
      nick: this.props.match.params.userName,
      message: message
    }
    socket.emit('privatemsg', msgObj, (resp) => {
      if (resp === true) {
        console.log("Message successfully sent");
      }
      else {
        console.log("Message send fail");
      }
    });
    this.setState({ message: '' });
  };
  componentWillUnmount() {
    socket.removeListener('recv_privatemsg');
    socket.removeListener('getHistory');
  }
  render() {
    const { message, privMessageHistory } = this.state;
    return (
      <div className="private-chat-window">
        <div className="chat-window-header">
          <h3><strong>{this.props.match.params.userName}</strong></h3>
        </div>
        <div className="chat-window-body">
          <div className="private-chat-window-msg-inp">
            <div className="chat-window-messages">
              <PrivateChatWindow.Messages messages={privMessageHistory} />
            </div>
            <div className="chat-window-input">
              <div className="input-group">
                <input type="text" value={message} onChange={e => this.setState({ message: e.target.value })}
                  placeholder="ENTER YOUR MESSAGE HERE..." />
                <button type="button" className="btn btn-primary" onClick={() => this.sendMessage(message)}>SEND</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

PrivateChatWindow.Messages = props => (
  <div className="chat-window-message-cont">
    {props.messages.map(m => <div key={m} className="message">{m}</div>)}
  </div>
);

PrivateChatWindow.Users = props => (
  <div className="users">
    {Object.keys(props.users).map((keyName, keyIndex) => <div key={keyIndex} className="user">{props.users[keyName]}</div>)}
  </div>
);

export default PrivateChatWindow;