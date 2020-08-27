import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Post from "../components/Post";

export class home extends Component {
  componentDidMount() {
    axios
      .get("/allPosts")
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  state = { posts: null };

  render() {
    let postsBlock = this.state.posts ? (
      this.state.posts.map((data) => <Post post={data} key={data.postId} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {postsBlock}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
