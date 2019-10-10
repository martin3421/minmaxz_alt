import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    console.log("hello")
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        Login
              </Header>
                    <Segment>
                        <Form size="large">
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Benutzername"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                type="password"
                                onChange={this.onChange}
                                value={password}
                            />
                            <Button 
                                color="blue" 
                                fluid size="large"
                                type="submit"
                                onClick={this.onSubmit}
                            >
                                Login
                            </Button>
                        </Form>
                    </Segment>
                    <Message>
                        Not registered yet? <a href="#">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  export default connect(
    mapStateToProps,
    { login }
  )(Login);
