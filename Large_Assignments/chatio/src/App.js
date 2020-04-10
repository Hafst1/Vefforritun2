import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './app.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatLobby from './components/ChatLobby/ChatLobby';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { ChatProvider } from './context/ChatContext.js';
import { socket } from './services/socketService';
import PrivateChatWindow from './components/PrivateChatWindow/PrivateChatWindow';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: {},
      users: []
    };
  }
  componentDidMount() {
    socket.on('roomlist', roomList => {
      this.setState({ ...this.state, rooms: roomList });
    });
    socket.on('userlist', userList => {
      this.setState({ ...this.state, users: userList });
    })
    socket.on('userdisconnected', response => {
      if (response) {
        socket.emit('users');
      }
    });
  }
  render() {
    return (
      <ChatProvider value={this.state}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/lobby" component={ChatLobby} />
              <Route exact path="/chatroom/:roomName" component={ChatWindow} />
              <Route exact path="/:userName" component={PrivateChatWindow} />
            </Switch>
          </BrowserRouter>
        </div>
      </ChatProvider>
    );
  }
}

export default hot(module)(App);