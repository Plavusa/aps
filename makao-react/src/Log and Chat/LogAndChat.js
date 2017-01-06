import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import {blueGrey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Chat from '../Log and Chat/Chat';
import Log from  '../Log and Chat/Log';
import ChatInputField from '../Log and Chat/ChatInputField';

class LogAndChat extends React.Component {
    get styles() {
        return {
            container: {},
            contentContainer: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            },
            title: {
                margin: '5% 0',
                textAlign: 'center',
                fontSize: 14,
                color: blueGrey300,
            },
            chat: {
                alignSelf: 'flex-end',
            }
        }
    }

    render() {
        return (
            <div style={{...this.styles.container, ...this.props.style}}>
                <div style={this.styles.contentContainer}>
                    <span style={this.styles.title}>LOG</span>
                    <Divider />

                    <SplitterLayout vertical
                                    percentage={true}
                                    primaryMinSize={2} secondaryMinSize={20}>
                        <Log />
                        <Chat userId={this.props.userId}
                              messages={this.props.chatMessages}
                              style={this.styles.chat}/>
                    </SplitterLayout>

                    <ChatInputField onEnter={(m) => this.props.onNewChatMessage(m)}/>
                </div>
            </div>
        );
    }
}
export default LogAndChat;

LogAndChat.defaultProps = {};

LogAndChat.propTypes = {};