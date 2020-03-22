import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import { socket } from "./service/socketService";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import ChatLobby from "./components/ChatLobby/ChatLobby";
import ChatWindow from "./components/ChatWindow/ChatWindow";

class App extends Component {
  render(){
    return(
      <div>
        {console.log(socket)}
        {console.log(this.state)}
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/lobby" component={ChatLobby} />
          <Route exact path="/chatroom" component={ChatWindow} />
        </Switch>
      </div>
    );
  }
}

//sfasdfasdf

export default hot(module)(App);