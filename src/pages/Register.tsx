import React, {ChangeEvent, MouseEvent} from 'react'; 
import Button from '@material-ui/core/Button';
import {registerUser} from '../Services/Firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userReduxActions from '../redux/actions/UserActions';
import { withRouter } from 'react-router-dom';

class RegisterPage extends React.Component<any, any> {
    state = {
        email: "",
        password: "",
        error : ""
    }
    handleRegister: void;
    constructor(props:any) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.doRegister = this.doRegister.bind(this);
    }
    doRegister(event:MouseEvent<HTMLElement>) {
        console.log("going to register");
        registerUser(
            this.state.email,
            this.state.password
        ).then((data) => {
            this.props.doLogin(data);
            this.props.history.push("/");
        }).catch((error) => {
            console.error("error", error);
        });
    }
    handleInput(event:ChangeEvent) {
        let elm = event.target as HTMLInputElement;
        this.setState({
            [elm.name] : elm.value
        });
    }
    render() {
        return (
            <div>
                <input type="text" name="email" placeholder="email address" value={this.state.email} onChange={this.handleInput}/>
                <br/>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput}/>
                <br/>
                <Button variant="contained" color="primary" disabled={!(this.state.email && this.state.password)} onClick={this.doRegister}>Register</Button>
            </div>
        );
    }
}
export default connect(
    null, 
    dispatch => bindActionCreators(userReduxActions, dispatch)
)(withRouter(RegisterPage));