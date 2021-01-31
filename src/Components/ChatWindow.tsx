import React , {ChangeEvent, KeyboardEvent} from 'react';
import { connect } from 'react-redux';
import { database as db } from '../Services/Firebase';

class ChatWindow extends React.Component<any, any> {
    state = {
        messages: [],
        typedMsg: ''
    }
    printedMessages: Array<string> = [];
    messagesEndRef = React.createRef<HTMLDivElement>();
    dbRef: any;
    constructor(props: any) {
        super(props);
        console.log("@props", props);
        this.typedMsg = this.typedMsg.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentDidUpdate () {
        this.scrollToBottom()
    }
    scrollToBottom = () => {
        this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    componentWillUnmount() {
        this.dbRef.off();
    }
    componentDidMount() {
        this.dbRef = db.ref('chats');
        this.dbRef.on("value", (snapshot:any) => {
            let vals: any = snapshot.val();
            let messages = Object.values(vals).filter((msg:any) => {
                return (
                    (
                        (
                            msg.to == this.props.currentUser.id 
                            && msg.from == this.props.user.id
                        )
                         ||
                        (
                            msg.from == this.props.currentUser.id 
                            && msg.to == this.props.user.id
                        )
                    )
                    && !this.printedMessages.includes(msg.id.toString())
                ) ?? msg
            });
            messages.forEach((msg:any) => {
                this.setState((prevstate:any) => {
                    this.printedMessages.push(msg.id.toString());
                    this.scrollToBottom()
                    return {
                        ...prevstate,
                        messages: [...prevstate.messages, msg]
                    }
                });
            });
          }, function (errorObject: any) {
            console.log("The read failed: ", errorObject);
          });
    }

    async sendMessage() {
        let message = {
            id : (new Date()).getTime(),
            sent: false,
            status: "to-be-sent",
            message: this.state.typedMsg,
            from: this.props.currentUser.id,
            to  : this.props.user.id
        }
        
        this.printedMessages.push(message.id.toString());
        this.setState((prevState:any) => ({
            ...prevState,
            typedMsg: "",
            messages: [...prevState.messages, message]
        }));
        await db.ref("/chats").push(message);
        this.setState((prevState:any) => ({
            ...prevState,
            messages: [...prevState.messages.map((msg:any) =>{ msg.status = msg.id == message.id ? 'sent' : msg.status; return msg; })]
        }));
        console.log(this.state.messages);
        
    }
    typedMsg(ev: ChangeEvent) {
        let elm = ev.target as HTMLInputElement;
        this.setState((prevState: any) => ({
            ...prevState,
            typedMsg: elm.value
        }));
    }
    formattedDate(dt:number) {
        let obj = new Date(dt);
        return obj.getFullYear() + "/"
               + (obj.getMonth() + 1) + ("/")
               + obj.getDate() + " "
               + obj.getHours() + ":" + obj.getMinutes();
        
    }
    render() {
        return (
            <div className='chatWindow'>
                <div className="chat-header">
                    <div className="close-div" onClick={() => {
                        this.props.removeChatWindow(this.props.user.id)
                    }}>&times;</div>
                    { this.props.user.email }
                </div>
                <div className="chat-messages">
                    {
                        this.state.messages.map((message: any) => { return (
                            <div className={ "messages " + message.status + " " + (message.from == this.props.currentUser.id ? 'my-msg' : 'recieved-msg')}>
                                <div className="msg-box">
                                    <span className="msg"> {message.message}</span>
                                    <div className="time"> {this.formattedDate(message.id)}
                                </div>
                                </div>
                            </div>
                        )})
                    }
                    <div ref={this.messagesEndRef}></div>
                </div>
                <div className="chat-footer">
                    <form onSubmit={this.sendMessage}>
                    <textarea onKeyPress={(ev:KeyboardEvent<HTMLTextAreaElement>) =>{
                        let key=ev.keyCode || ev.which;
                        if (key == 13) {
                            this.sendMessage();
                        }
                    }} className="chatInput" placeholder="Type something" onChange={this.typedMsg} value={this.state.typedMsg}></textarea>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect((state: any) => ({
    currentUser: state.user
}))(ChatWindow);