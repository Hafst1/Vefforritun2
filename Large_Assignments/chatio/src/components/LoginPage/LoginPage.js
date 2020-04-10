import React from 'react';
import { Redirect } from 'react-router-dom';
import { socket } from '../../services/socketService';

class LoginWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      redirect: false
    };
  }
  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to='/lobby' />
    }
  }
  setNickname(nickname) {
    if (nickname === '') {
      return false;
    }
    socket.emit('adduser', nickname, (response) => {
      if (response === true) {
        socket.emit('users');
        socket.emit('rooms');
        this.setState({ redirect: true });
      } else {
        console.log("doesn't work");
      }
    });
    this.setState({ nickname: '' });
  }
  render() {
    const { nickname } = this.state;
    return (
      <div id="login-window">
        <div id="login-header">
          <h3>ChatIo</h3>
        </div>
        <div id="login-body">
          <div className="form-group" id="login-form">
            <form>
              <label className="control-label" htmlFor="login-name">Pick Username:</label>
              <input type="text" name="login-input" id="login-name" className="form-control" value={nickname}
                onChange={e => this.setState({ nickname: e.target.value })} />
            </form>
            <button type="button" className="btn btn-primary" onClick={() => this.setNickname(nickname)}>Submit</button>
            {this.renderRedirect()}
          </div>
        </div>
      </div>
    );
  }
};

export default LoginWindow;