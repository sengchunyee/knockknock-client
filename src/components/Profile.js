import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { Typography, IconButton } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import KeyBoardReturn from "@material-ui/icons/KeyboardReturn";
import dayjs from "dayjs";
import { logoutUser, uploadImage } from "../redux/actions/userAction";
import EditProfile from "../components/EditProfile";
import Avatar from "@material-ui/core/Avatar";
const styles = (theme) => ({ ...theme.spreadIt });

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("profileImageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />

              <input
                type="file"
                id="profileImageInput"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <Tooltip title="Edit Profile Picture" placement="top">
                <IconButton onClick={this.handleEditPicture}>
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                {handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOnIcon color="primary" />
                  <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarTodayIcon color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <Tooltip title="Logout" placement="top-start">
              <IconButton onClick={this.handleLogout}>
                <KeyBoardReturn color="primary" />
              </IconButton>
            </Tooltip>
            <EditProfile />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile found, please login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({ user: state.user });
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
