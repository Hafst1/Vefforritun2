import React from 'react'
import { socket } from '../../service/socketService';

class ChatWindow extends React.Component {
  componentDidMount() {
    console.log(socket);
    socket.on('updateChat', message => {
      const {messages} = this.state;
      this.setState({messages: [...messages, message]});
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
  }
  sendMessage(message) {
    if (message === '') {
      return false;
    }
    socket.emit('sendmessage', message);
    this.setState({message: ''});
  }
  render() {
    const {messages, message} = this.state;
    return (
      <div className="chat-window">
        <h3>ChatIO</h3>
        <ChatWindow.Messages messages={messages} />
        <div className="input-container input-group">
          <input type="text" value={message} onChange={e=> this.setState({message: e.target.value})} placeholder="Enter your nessage here..." />
          <button type="button" className="btn btn-primary" onClick={() => this.sendMessage(message)}>Send</button>
        </div>
      </div>
    )
  }
}

// ChatWindow.Title = () => (
//     <h3>
//         <strong>CHATIO</strong>
//         {/* <span className="first">C</span>
//         <span className="second">h</span>
//         <span className="third">a</span>
//         <span className="fourth">t</span>
//         <span className="fifth">.</span>
//         <span className="sixth">i</span>
//         <span className="seventh">o</span> */}
//     </h3>
// );

ChatWindow.Messages = props => (
  <div className="messages">
    {props.listOfMessages.map(m => <div key={m} className="message">{m}</div>)}
  </div>
);

// ChatWindow.Users = props => (
//     <div className="users">
//         { props.users.map(u => <div key={ u } className="user">{ u }</div>) }
//     </div>
// );

export default ChatWindow;