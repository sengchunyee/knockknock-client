import React, { Component } from "react";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataAction";
import PropTypes from "prop-types";

const styles = (theme) => ({ ...theme.spreadIt, button: { float: "right" } });
class LikeButton extends Component {
  likedPosts = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };
  likePost = () => {
    console.log(this.props.postId);
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const {
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedPosts() ? (
      <MyButton tip="Undo like" onClick={this.unlikePost}>
        <Favorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="aaaaLike" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionsToProps = { likePost, unlikePost };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(LikeButton));
