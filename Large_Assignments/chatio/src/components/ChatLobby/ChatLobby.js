import React from "react";
import { socket } from "../../service/socketService";

class ChatWindow extends React.Component {
  componentDidMount() {
    socket.on("updateusers", (room, roomUsers, roomOps) => {
      if (room === this.props.match.params.roomName)
        this.setState({
          ...this.state,
          room: { ...this.state.room, users: roomUsers, ops: roomOps }
        });
    });
    socket.on("updatechat", (room, roomMessageHistory) => {
      if (room === this.props.match.params.roomName) {
        this.setState({
          ...this.state,
          room: {
            ...this.state.room,
            messageHistory: this._editMessageHistory(roomMessageHistory)
          }
        });
      }
    });
    socket.on("servermessage", (event, roomName, userName) => {
      const { room } = this.state;
      this.setState({
        ...this.state,
        room: {
          ...this.state.room,
          messageHistory: [
            ...room.messageHistory,
            this._editServermessage(event, roomName, userName)
          ]
        }
      });
    });
    socket.on("updatetopic", (room, topic, username) => {
      if (room === this.props.match.params.roomName) {
        this.setState({
          ...this.state,
          room: { ...this.state.room, topic: topic }
        });
      }
    });
    socket.on("banned", (roomName, bannedUser, userName) => {
      const { room } = this.state;
      if (roomName === this.props.match.params.roomName) {
        this.setState({
          ...this.state,
          room: { ...this.state.room, banned: { ...room.banned, bannedUser } }
        });
      }
    });
  }
  _editMessageHistory(messageHistory) {
    return messageHistory.map(m => `${m.timestamp} - ${m.nick} - ${m.message}`);
  }
  _editServermessage(event, room, userName) {
    if (event === "quit") {
      if (this.props.match.params.roomName in room) {
        return `${userName} has disconnected from the server`;
      }
    } else {
      if (room === this.props.match.params.roomName) {
        if (event === "join") {
          return `${userName} has joined the chatroom`;
        } else if (event === "part") {
          return `${userName} has left the chatroom`;
        }
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      room: {
        users: {},
        ops: {},
        banned: {},
        messageHistory: [],
        topic: "No topics has been set for room..",
        password: "",
        locked: false
      },
      message: ""
    };
  }
  sendMessage(message) {
    if (message === "") {
      return false;
    }
    var msgObj = {
      roomName: this.props.match.params.roomName,
      msg: message
    };
    socket.emit("sendmsg", msgObj);
    this.setState({ message: "" });
  }
  render() {
    const { room, message } = this.state;
    return (
      <div className="chat-window">
        <h4>
          <strong>
            {this.props.match.params.roomName} - Topic: {room.topic}
          </strong>
        </h4>
        {/* <ChatWindow.Title /> */}
        <ChatWindow.Messages messages={room.messageHistory} />
        <ChatWindow.Users users={room.users} />
        <div className="input-container input-group">
          <input
            type="text"
            value={message}
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="ENTER YOUR MESSAGE HERE..."
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.sendMessage(message)}
          >
            SEND
          </button>
        </div>
      </div>
    );
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
    {props.messages.map(m => (
      <div key={m} className="message">
        {m}
      </div>
    ))}
  </div>
);

ChatWindow.Users = props => (
  <div className="users">
    {Object.keys(props.users).map((keyName, keyIndex) => (
      <div key={keyIndex} className="user">
        {props.users[keyName]}
      </div>
    ))}
  </div>
);

export default ChatWindow;
