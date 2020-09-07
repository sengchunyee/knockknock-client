import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

AuthRoute.propTypes = { user: PropsTypes.object.isRequired };

export default connect(mapStateToProps)(AuthRoute);
