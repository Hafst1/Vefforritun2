import React from 'react';
import { socket } from '../../service/socketService';

// socket.on('recv_privatemsg', (fromUser, privMessage) => {
// 	if (fromUser === this.props.match.params.userName) {
// 		const { messageHistory } = this.state;
// 		this.setState({ messageHistory: [...messageHistory, privMessage] });
// 	}
// })

class PrivateChatWindow extends React.Component {
    componentDidMount() {
        socket.on('recv_privatemsg', (fromUser, privMessage) => {
            console.log(fromUser);
            console.log(this.props.match.params.userName);
            const { messageHistory } = this.state;
            if (fromUser === this.props.match.params.userName)
                this.setState({ ...this.state, messageHistory: [...messageHistory, privMessage] });
        });
    };
    _editMessageHistory(messageHistory) {
        return messageHistory.map(m => `${ m.timestamp } - ${ m.nick } - ${ m.message }` );
    };
    constructor(props) {
        super(props);
        this.state = {
            messageHistory: [],
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
                console.log("works");
            }
            else {
                console.log("doesn't work");
            }
         });
        this.setState({ message: '' });
    };
    render() {
        const { message, messageHistory } = this.state;
        console.log(messageHistory);
        return (
            <div className="chat-window">
                <h4><strong>{this.props.match.params.userName}</strong></h4>
                {/* <ChatWindow.Title /> */}
                <PrivateChatWindow.Messages messages={ messageHistory } />
                {/* <PrivateChatWindow.Users users={ users } /> */}
                <div className="input-container input-group">
                    <input type="text" value={ message } onChange={e => this.setState({ message: e.target.value })}
                    placeholder="ENTER YOUR MESSAGE HERE..." />
                    <button type="button" className="btn btn-primary" onClick={() => this.sendMessage(message)}>SEND</button>
                </div>
            </div>
        );
    };
};

PrivateChatWindow.Messages = props => (
    <div className="messages">
        { props.messages.map(m => <div key={ m } className="message">{ m }</div>) }
    </div>
);
 
PrivateChatWindow.Users = props => (
    <div className="users">
        {Object.keys(props.users).map((keyName, keyIndex) => <div key={ keyIndex } className="user">{props.users[keyName]}</div>)}
    </div>
);

export default PrivateChatWindow;