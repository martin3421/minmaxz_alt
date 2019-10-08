import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired
      };
    componentDidUpdate(prevProps) {
        const { error, alert } = this.props;
        if (error !== prevProps.error) {
            if(error.msg.datum) alert.error(`Datum: ${error.msg.datum.join()}`);
            if(error.msg.beschreibung) alert.error(`Beschreibung: ${error.msg.beschreibung.join()}`);
            if(error.msg.betrag) alert.error(`Datum: ${error.msg.betrag.join()}`);
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors
  });

  export default connect(mapStateToProps)(withAlert()(Alerts));