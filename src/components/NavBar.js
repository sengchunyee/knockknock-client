import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notification from "@material-ui/icons/Notifications";
import NewPost from "../components/NewPost";
const styles = (theme) => ({ ...theme.spreadIt });

class NavBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
              <NewPost />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notification />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NavBar);
