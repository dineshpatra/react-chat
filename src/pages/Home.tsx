import React from 'react';
import {withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {RootState} from '../redux/reducers';
import Users from '../Components/Users';
import ChatWindows from '../Components/ChatWindows';
import { ChatWindowsProvider } from '../context/ChatWindow';

export class Home extends React.Component<any, any> {
    state = {
        chatUserIds: []
    }
    constructor(props:any) {
        super(props);
        this.addNewChatWindow = this.addNewChatWindow.bind(this);
        this.removeChatWindow = this.removeChatWindow.bind(this);
    }
    addNewChatWindow(userId:string) {
        this.setState((prevState: any) => {
            return {
                ...prevState,
                chatUserIds: [...Array.from((new Set([...prevState.chatUserIds, userId])))]
            }
        });
    };
    removeChatWindow(userId:string) {
        console.log("@==", userId);
        this.setState((prevState: any) => {
            prevState.chatUserIds.splice(
                prevState.chatUserIds.findIndex((item:any) => item.id == userId), 1
            );
            return  prevState;
        });
    }

    componentWillMount() {
        document.title = "Home";
    }
    render() {
        return (
            <div className="home-page">
            { this.props.currentUser.isLoggedIn ? (
                    <>
                        {/** <ChatWindowsProvider value={{userIds:[], ()), removeUserId}}> **/}
                            <Users addNewChatWindow={this.addNewChatWindow}/>
                            <ChatWindows chatUserIds={this.state.chatUserIds} removeChatWindow={this.removeChatWindow}/>
                        {/** </ChatWindowsProvider> **/}
                    </>
                ) : (
                    <h6>User is not logger in </h6>
                )
            }
            </div>
        );
    }
}
export default connect((state:RootState) => ({currentUser: state.user}) )(withRouter(Home));