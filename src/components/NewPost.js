import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MyButton from "../util/MyButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { newPost, clearErrors } from "../redux/actions/dataAction";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "relative",
    left: "85%",
    marginTop: "10px",
    marginBottom: "10px",
  },
  progressSpinner: { position: "absolute" },
  closeButton: { position: "absolute", left: "90%" },
});

class NewPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  toggleOpen = () => {
    this.setState({ open: true });
  };
  toggleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.newPost({ body: this.state.body });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ open: false, errors: {}, body: "" });
    }
  }
  render() {
    const { errors, open } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.toggleOpen} tip="New Post">
          <AddIcon />
        </MyButton>
        <Dialog open={open} onClose={this.toggleClose} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.toggleClose}
            open={this.state.open}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Send new Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post"
                multiline
                rows="3"
                placeholder="Anything in your mind?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size="30"
                    className={classes.progressSpinner}
                  ></CircularProgress>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

NewPost.propTypes = {
  newPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ UI: state.UI });

const mapActionsToProps = { newPost, clearErrors };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewPost));
