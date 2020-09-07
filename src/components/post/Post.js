import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

const styles = {
  card: { display: "flex", marginBottom: 20, position: "relative" },
  image: { minWidth: 200 },
  content: { padding: 25, objectFit: "cover" },
};
class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        commentCount,
        likeCount,
        postId,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    console.log("postrender", this.props);
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} comments</span>
          <PostDialog postId={postId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}
Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
