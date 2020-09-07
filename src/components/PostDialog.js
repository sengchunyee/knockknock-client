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
import { getPost } from "../redux/actions/dataAction";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import dayjs from "dayjs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { likePost, unlikePost } from "../redux/actions/dataAction";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import DeletePost from "../components/DeletePost";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spreadIt,
  invisibleSeperator: { border: "none", margin: "4" },
  userImage: {
    height: 200,
    maxWidth: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 12,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
  },
});
class PostDialog extends Component {
  state = { open: false };
  toggleOpen = () => {
    this.setState({ open: true });
  };
  toggleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getPost(this.props.postId);
  }
  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userHandle,
        userImage,
      },
      UI: { loading },
    } = this.props;
    const { open } = this.state;
    const dialog = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={1} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.userImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeperator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.toggleOpen}
          tip="Expand"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialog}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ UI: state.UI, post: state.data.post });

const mapActionsToProps = { getPost };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
