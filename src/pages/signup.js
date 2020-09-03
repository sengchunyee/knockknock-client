import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/icon.jpg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";
const styles = (theme) => ({ ...theme.spreadIt });

class signUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      handle: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="logo" className={classes.images} />
          <Typography variant="h5" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.email}
              fullWidth
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.password}
              fullWidth
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="ConfirmPassword"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.handle}
              fullWidth
              helperText={errors.handle}
              error={errors.handle ? true : false}
            />
            {errors.message && (
              <Typography variant="body2" className={classes.customError}>
                {errors.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
            </Button>
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
            <br />
            <small>
              Already have an account? Log in <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signUp.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user, UI: state.UI });

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signUp)
);
