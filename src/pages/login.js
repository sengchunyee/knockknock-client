import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../images/icon.jpg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({ ...theme.spreadIt });

class login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", loading: false, errors: {} };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = { email: this.state.email, password: this.state.password };
    axios
      .post("/login", userData)
      .then((res) => {
        localStorage.setItem("idToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ errors: err.response.data, loading: false });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="logo" className={classes.images} />
          <Typography variant="h5" className={classes.pageTitle}>
            Login
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
              Login
            </Button>
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
            <br />
            <small>
              Dont have a account? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
