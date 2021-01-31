import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button      from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import * as UserActions from '../redux/actions/UserActions';
import { bindActionCreators } from 'redux';
import { auth } from '../Services/Firebase';
class MainHeader extends React.Component<any, any> {

    constructor(props:any) {
        super(props);
        this.goToRegisterPage = this.goToRegisterPage.bind(this);
        this.goToLoginPage = this.goToLoginPage.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }
    goToHome() {
        this.props.history.push('/');
    }
    goToRegisterPage() {
        this.props.history.push('/register');
    }
    goToLoginPage() {
        this.props.history.push('/login');
    }
    async doLogout() {
        await auth.signOut();
        await this.props.doLogout();
        this.props.history.push("/login");
    }
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" color="primary">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}} onClick={this.goToHome}>
                        React Chat
                    </Typography>
                    {
                        (!this.props.currentUser.isLoggedIn) ? (
                            <div>
                                <Button color="inherit" onClick={this.goToLoginPage}>Login</Button>
                                |
                                <Button color="inherit" onClick={this.goToRegisterPage}>Register</Button>
                            </div>
                        ) : (
                            <div>
                                <Button color="inherit" onClick={() => {this.props.history.push("/myprofile");}}>My Profile</Button>
                                |
                                <Button color="inherit" onClick={this.doLogout}>Logout</Button>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        );
    }
}
export default connect(
    (state:RootState) => ({currentUser: state.user}),
    (dispatch)        => bindActionCreators(UserActions, dispatch)
)(withRouter(MainHeader));