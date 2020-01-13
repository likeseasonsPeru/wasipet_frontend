import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import initialize from '../../utils/initialize';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        WasipetApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(
      { email: this.state.email, password: this.state.password },
      'login'
    );

  }

  render() {
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '80px' }}>
          <CssBaseline />
          <Typography component="h1" variant="h5" align="center">
          Login
         </Typography>
        <form onSubmit={this.handleSubmit.bind(this)} className="container" style={{ width: '100%' }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <div className="field">
            <p className="control has-text-centered">
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </p>
          </div>
        </form>
        <Box mt={8}>
          <Copyright />
        </Box>
        </Container>
    );
  }
}

export default connect(
  state => state,
  actions
)(LoginForm);