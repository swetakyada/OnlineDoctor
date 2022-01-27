import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import { LoginWrapper, LoginSignupForm } from 'react-login-signup-form';
import { login, setRedirectUrl, signup } from './actions/loginActions.js';
import Home from '../pages';

function mapStateToPropsForm(state) {
    return {
        isLoading: state.login.isLoading,
        isLoggedIn: state.login.isLoggedIn,
        redirectUrl: state.login.redirectUrl,
    }
}
const ConnectedForm = withRouter(connect(mapStateToPropsForm)(LoginSignupForm));

function mapStateToPropsLoginWrapper(state) {
    return {
        isLoggedIn: state.login.isLoggedIn,
    }
}
const ConnectedLoginWrapper = withRouter(connect(mapStateToPropsLoginWrapper)(LoginWrapper));

const routes = (
    <div>
        <Route path='/login' render={() =>
            <ConnectedForm
                backgroundImageUrl="https://i.pinimg.com/originals/1e/92/d2/1e92d2809d44371f04cbc4d3d6ce22c1.jpg"
                containerPosition="0.67"
                tryLoginAction={login}
                trySignupAction={signup}
            />
        } />
        <ConnectedLoginWrapper
            setRedirectUrlAction={setRedirectUrl}
        >
            <Route path='/' component={Home} />
        </ConnectedLoginWrapper>
    </div>
);

export default routes;