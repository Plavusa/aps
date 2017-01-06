/**
 * Created by Masa on 28-Dec-16.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainMuiTheme from '../MainMuiTheme';


import GameResizeHandler from '../Game/GameResizeHandler';
import RightSidebar from './RightSidebar';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: 1,
            userName: 'masa',
            chatMessages: [
                {
                    userId: 3,
                    userName: "Nemanja",
                    time: "2:45",
                    message: "zdravo"
                },
                {
                    userId: 2,
                    userName: "Darko",
                    time: "1:50",
                    message: "poz"
                },
                {
                    userId: 1,
                    userName: "Nikolica",
                    time: "2:35",
                    message: "poruka"
                },
                {
                    userId: 4,
                    userName: "Jajac",
                    time: "2:38",
                    message: "13"
                },
            ]
        };

        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage(message, id, name) {
        const time = new Date();
        const newMessage = {
            userId: id ? id : this.state.userId,
            userName: name ? name : this.state.userName,
            time: time.getHours() + ":" + time.getMinutes(),
            message: message,
        };
        const chatMessages = [...this.state.chatMessages, newMessage];
        this.setState({chatMessages: chatMessages});
        document.getElementById('chat-input').value = null;
    }

    get styles() {

        return {
            container: {
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
            game: {
                width: '100%',
                height: '100%',
            },
            rightSidebar: {}
        }
    }


    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(mainMuiTheme)}>
                    <div style={this.styles.container}>
                        <div style={this.styles.game}>
                            <GameResizeHandler userId={this.state.userId}/>
                        </div>
                        <RightSidebar userId={this.state.userId}
                                      chatMessages={this.state.chatMessages}
                                      onNewChatMessage={(m)=>this.handleNewMessage(m)} />
                    </div>

                </MuiThemeProvider>
            </div>
        );
    }
}

export default Main;