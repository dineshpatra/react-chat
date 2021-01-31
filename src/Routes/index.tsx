import React, { FunctionComponent } from "react";
import {
  Route, 
  Redirect,
  RouteProps, 
  RouteComponentProps
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

interface PrivateRouteProps extends RouteProps {
  component:| React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const LoginRequireRoute: FunctionComponent<PrivateRouteProps> = ({component: Component,...rest}) => {
    const state = useSelector((state:RootState) => ({user: state.user}));
    return (
    <Route {...rest}
      render={props =>
        state.user.isLoggedIn ? ( 
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export const LoginNotRequireRoute: FunctionComponent<PrivateRouteProps> = ({component: Component, ...rest}) => {
    const state = useSelector((state:RootState) => ({user: state.user}));
    return (
        <Route {...rest}
        render={
            props => {
                return state.user.isLoggedIn ? ( 
                    <Redirect 
                        to={
                            {
                                pathname: "/"
                            }
                        } 
                    /> 
                ) : (
                    <Component {...props} />
                )
            }
        }
        />
    );
}