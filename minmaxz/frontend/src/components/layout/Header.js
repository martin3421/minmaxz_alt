import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";



export class Header extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />

                    <Menu.Menu position="right">
                        <Menu.Item as={ Link } name="login" to="login">
                            Login
                        </Menu.Item>

                        <Menu.Item as={ Link } name="register" to="register">
                            Register
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

export default Header

