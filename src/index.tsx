import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {LoginNotRequireRoute, LoginRequireRoute} from './Routes';
import {createStore } from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers';

import Loading from './Components/Loading';
import Header  from './Components/MainHeader';

const HomePage      = lazy(() => import('./pages/Home'));
const LoginPage     = lazy(() => import('./pages/Login'));
const PageNotFound  = lazy(() => import('./pages/PageNotFound'));
const MyProfilePage = lazy(() => import('./pages/MyProfile'));
const RegisterPage  = lazy(() => import('./pages/Register'));

const store = createStore(reducer);

ReactDOM.render( 
    <Provider store={store}>
      <Router>
        <Header/>
        <Suspense fallback={<Loading/>}>
          <Switch>
              <Route                exact path="/"          component={ HomePage } />
              <LoginNotRequireRoute exact path="/login"     component={ LoginPage } />
              <LoginNotRequireRoute exact path="/register"  component={ RegisterPage } />
              <LoginRequireRoute    exact path="/myprofile" component={ MyProfilePage } />
              <Route                path="*"                component={ PageNotFound } />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);