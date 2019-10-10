import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.datum) alert.error(`Datum: ${error.msg.datum.join()}`);
            if (error.msg.beschreibung) alert.error(`Beschreibung: ${error.msg.beschreibung.join()}`);
            if (error.msg.betrag) alert.error(`Betrag: ${error.msg.betrag.join()}`);
            if (error.msg.non_field_errors)
                alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
        }
        if (message !== prevProps.message) {
            if (message.deleteBuchung) alert.success(message.deleteBuchung);
            if (message.addBuchung) alert.success(message.addBuchung);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));