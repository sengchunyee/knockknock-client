import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { submitComment, clearErrors } from "../../redux/actions/dataAction";

const styles = (theme) => ({ ...theme.spreadIt });

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {},
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.postId, {
      body: this.state.body,
    });
    this.props.clearErrors();
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
    }
    this.setState({ body: "" });
  }
  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    const commentFormMarkUp = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on post"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeperator} />
      </Grid>
    ) : null;
    return commentFormMarkUp;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
};
const mapActionsToProps = { submitComment, clearErrors };
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
