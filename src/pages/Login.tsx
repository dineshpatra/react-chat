import React, {ChangeEvent, MouseEvent, FocusEvent} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../redux/actions/UserActions';
import { isValidEmail } from '../Services/utility';
import Loading from '../Components/Loading';
import { app, signin } from '../Services/Firebase';
import {
    Divider
    ,Typography
    ,FormGroup
    ,Button
    ,TextField
    ,FormControl
} from '@material-ui/core';

class LoginPage extends React.Component<any, any> {
    state:any = {
        email : {
            touched  : false,
            value    : '',
            hasError : false
        },
        password : {
            touched  : false,
            value    : '',
            hasError : false
        },
        isProcessing: false
    };
    constructor(props:any) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        document.title = "Login";
    }
    async doLogin() {
        try {
            this.setState(() => ({isProcessing:true}));
            let user = await signin(
                this.state.email.value,
                this.state.password.value
            );
            await this.props.doLogin(user);
            this.setState(() => ({isProcessing:false}));
            this.props.history.push('/');
        } catch (err) {
            console.error(err);
        }
    }
    handleChange(event: ChangeEvent) {
        let elm = event.target as HTMLInputElement;
        this.setState((state:any) => ({
            [elm.name] : {
                ...state[elm.name], 
                value: elm.value, 
                hasError: elm.name == 'email' ? isValidEmail(elm.value) : !/[\d\w\W]{6,}/.test(elm.value)
            }
        }));
    }
    render() {
        return (
            <div id="loginPage">
                <div id="loginForm">
                    <Typography variant="h4" component="h2" style={{textAlign:"center"}}>React Chat</Typography>
                    <Typography style={{textAlign:"center"}}>Sign In</Typography>
                    <Divider />
                    {this.state.email.hasError}
                    <div id="loginFormContent">
                        <FormGroup>
                            <FormControl style={{marginBottom: "15px"}}>
                                <TextField 
                                    name     = "email" 
                                    label    = "Email"
                                    variant  = "outlined"
                                    onChange = {this.handleChange}
                                    helperText={this.state.email.hasError ? "Invalid email address provided." : undefined}
                                    error={this.state.email.hasError}
                                />
                            </FormControl>
                            <FormControl  style={{marginBottom: "15px"}}>
                                <TextField 
                                    name     = "password" 
                                    label    = "Password"
                                    variant  = "outlined"
                                    type     = "password"
                                    onChange = {this.handleChange}
                                    helperText={this.state.password.hasError ? "Invalid password provided." : undefined}
                                    error={this.state.password.hasError}
                                />
                            </FormControl>
                            <Button color="primary" variant="contained" onClick={this.doLogin}
                                disabled={(this.state.email.hasError || this.state.password.hasError)}>Sign In</Button>
                        </FormGroup>              
                    </div>
                </div>
                {this.state.isProcessing ? <Loading/>: undefined }
            </div>
        );
    }
}
export default connect(null, (dispatch) => bindActionCreators(UserActions , dispatch))(withRouter(LoginPage));