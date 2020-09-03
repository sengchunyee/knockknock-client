import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { editUserProfile } from "../redux/actions/userAction";
import { Tooltip, IconButton } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({ ...theme.spreadIt, button: { float: "right" } });

class EditProfile extends Component {
  componentDidMount() {
    const { credentials } = this.props;
    this.setUserDetailsToState(credentials);
  }

  setUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      website: credentials.website ? credentials.website : "",
    });
  };

  toggleOpen = (event) => {
    this.setState({ open: true });
    this.setUserDetailsToState(this.props.credentials);
  };

  toggleClose = () => {
    this.setState({ open: false });
  };

  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };
  handleSubmit = () => {
    const newUserDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserProfile(newUserDetails);
    this.toggleClose();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="top">
          <IconButton
            onClick={this.toggleOpen}
            className={classes.button}
            id="profileDialog"
          >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.toggleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Edit Profile Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="bio"
              id="bio"
              label="bio"
              type="text"
              fullWidth
              rows="3"
              placeholder="Add a short bio to tell people more about yourself"
              className={classes.textField}
              value={this.state.bio}
              onChange={this.handleChange}
            ></TextField>
            <TextField
              name="location"
              id="location"
              label="location"
              type="text"
              fullWidth
              rows="3"
              placeholder="Place you stay"
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange}
            ></TextField>
            <TextField
              name="website"
              id="website"
              label="website"
              type="text"
              fullWidth
              rows="3"
              placeholder="To feature links on your profile."
              className={classes.textField}
              value={this.state.website}
              onChange={this.handleChange}
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  editUserProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ credentials: state.user.credentials });

const mapActionsToProps = { editUserProfile };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditProfile));
