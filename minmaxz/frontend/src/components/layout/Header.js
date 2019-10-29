import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";



export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { activeItem } = this.state

        const authLinks = (
            <Menu.Menu position="right">
                <Menu.Item>
                    {user ? `Welcome ${user.username}` : ""}
                </Menu.Item>
                <Menu.Item
                    name="logout"
                    onClick={this.props.logout}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        );

        const guestLinks = (
            <Menu.Menu position="right">
                <Menu.Item
                    as={Link}
                    name="login"
                    to="login">
                    Login
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    name="register"
                    to="register">
                    Register
                </Menu.Item>
            </Menu.Menu>
        );

        const userMenu = (
            <Menu.Item
                as={Link}
                name='konten'
                to="/konten"
                active={activeItem === 'konten'}
                onClick={this.handleItemClick}
            />
        );

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    {isAuthenticated ? userMenu : ""}
                    {isAuthenticated ? authLinks : guestLinks}
                </Menu>

            </Segment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);

