import React, { Component } from 'react'
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

    onSubmit = e => {
        e.preventDefault();
        console.log('submit')
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {
        const { username, email, password1, password2 } = this.state;
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
                                onChange={this.onChange}
                                value={password1}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password2"
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
                        Not registered yet? <a href="#">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
