import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Avatar from "@material-ui/core/Avatar";
const styles = (theme) => ({
  ...theme.spreadIt,
  commentData: { marginLeft: 20 },
  commentImage: {
    maxWidth: "100%",
    maxHeight: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
});

class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, userImage, createdAt, postId, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      alt="Profile"
                      src={userImage}
                      component={Link}
                      to={`/users/${userHandle}`}
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        color="primary"
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                      >
                        {userHandle}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {dayjs(createdAt).format("h:mm a,MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeperator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
