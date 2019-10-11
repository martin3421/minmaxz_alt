import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password1: "",
        password2: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
      };

      onSubmit = e => {
        e.preventDefault();
        const { username, email, password1, password2 } = this.state;
        if (password1 !== password2) {
          this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
        } else {
          const newUser = {
            username,
            email,
            password1,
            password2
        };
          this.props.register(newUser);
        }
      };

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
          }
        const { username, email, password1, password2 } = this.state;
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        Register
              </Header>
                    <Segment>
                        <Form size="large" onSubmit={this.onSubmit}>
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
                                icon="user"
                                iconPosition="left"
                                placeholder="Email address"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password1"
                                type="password"
                                onChange={this.onChange}
                                value={password1}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password2"
                                type="password"
                                onChange={this.onChange}
                                value={password2}
                            />
                            <Button 
                                color="blue" 
                                fluid size="large"
                                type="submit"
                            >
                                Register
                            </Button>
                        </Form>
                    </Segment>
                    <Message>
                    Already have an account? <Link to="/login">Login</Link>
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
    { register, createMessage }
  )(Register);
