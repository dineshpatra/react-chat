import React from 'react';
import {database} from '../Services/Firebase';

export default class Users extends React.Component<any, any> {
    state:{
        users: Array<{
            email: string,
            id: string
        }>
    } = {
        users: []
    };

    /**
     * Constructor method
     * 
     * @param props 
     */
    constructor(props:any) {
        super(props);
    }

    componentDidMount = async () => {
        try {
            let db = await database.ref("/users").once('value');
            let users:Array<{id:string, email:string}> = db.val();
            Object.values(users).forEach((user) => {
                this.setState((prevState:any) => ({
                    users: [
                        ...prevState.users,
                        {
                            id: user.id,
                            email: user.email
                        }
                    ]
                }));
            });
        } catch (err) {
            console.log(err);
        }
        
        // Will be our firebase
        // get users
    }

    render() {
        return (
            <>
                <div id="userList">
                    {
                        this.state.users.map((user) => {
                            {
                                return (
                                    <div className="user" 
                                        id={user.id}
                                        onClick={
                                            (event) => {
                                                let target = event.target as HTMLDivElement;
                                                this.props.addNewChatWindow(user)
                                            }
                                        }>{user.email}</div>
                                )
                            }
                        })
                    }
                </div>
            </>
        );
    }
}