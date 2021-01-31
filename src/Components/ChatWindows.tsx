import React from 'react';
import { threadId } from 'worker_threads';
import ChatWindow  from './ChatWindow';

export default class ChatWindows extends React.Component<any, any> {


    render() {
        return (
            <div id="chatWindows">
                {
                    this.props.chatUserIds.map((user:any) => (<ChatWindow user={user} removeChatWindow={this.props.removeChatWindow}/>))
                }
            </div>
        );
    }
}