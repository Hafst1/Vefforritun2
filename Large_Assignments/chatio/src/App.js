import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import { socket } from "./service/socketService";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ChatLobby from "./components/ChatLobby/ChatLobby";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import {ChatProvider} from './context/ChatContext'

class App extends Component {
  componentDidMount() {
      socket.on('roomlist', roomList => {
          this.setState({ ...this.state, rooms: roomList });
      });
      socket.on('userlist', userList => {
          this.setState({ ...this.state, users: userList });
      })
  }
  constructor(props) {
      super(props);
      this.state = {
          rooms: {},
          users: []
      };
  }
  render() {
      console.log(this.state.rooms);
      console.log(this.state.users);
      return (
          <ChatProvider value={ this.state }>
              <div>
                  <Switch>
                      <Route exact path="/" component={LoginPage} />
                      <Route exact path="/lobby" component={ChatLobby} />
                      <Route exact path="/chatroom/:roomName" component={ChatWindow} />
                  </Switch>
              </div>
          </ChatProvider>
      );
  }
}

export default hot(module)(App);