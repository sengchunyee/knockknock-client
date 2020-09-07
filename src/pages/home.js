import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import { getPosts } from "../redux/actions/dataAction";
import { connect } from "react-redux";
class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let postsBlock = !loading ? (
      posts.map((data) => <Post post={data} key={data.postId} />)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {postsBlock}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = { getPosts };

export default connect(mapStateToProps, mapActionsToProps)(home);
