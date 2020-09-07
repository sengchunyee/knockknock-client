import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import { deletePost } from "../../redux/actions/dataAction";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: { left: "90%", position: "absolute", top: "10%" },
};

class DeletePost extends Component {
  state = { open: false };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Post"
          onClick={this.toggleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.toggleOpen}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogActions>
            <Button onClick={this.toggleOpen} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapActionsToProps = { deletePost };

export default connect(null, mapActionsToProps)(withStyles(styles)(DeletePost));
