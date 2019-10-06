import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getBuchungen, deleteBuchung } from "../../../actions/buchungen";
import { Icon, Label, Button, Table } from 'semantic-ui-react'

export class Buchungen extends Component {
    static propTypes = {
        buchungen: PropTypes.array.isRequired,
        getBuchungen: PropTypes.func.isRequired,
        deleteBuchung: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getBuchungen();
    }

    render() {
        return (
            <Fragment>
                <h2>Buchungen</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Datum</Table.HeaderCell>
                            <Table.HeaderCell>Konto1</Table.HeaderCell>
                            <Table.HeaderCell>Konto1</Table.HeaderCell>
                            <Table.HeaderCell>Beschreibung</Table.HeaderCell>
                            <Table.HeaderCell>Betrag</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.buchungen.map(buchung => (
                            <Table.Row key={buchung.id}>
                                <Table.Cell>{buchung.datum}</Table.Cell>
                                <Table.Cell>{buchung.konto1_name}</Table.Cell>
                                <Table.Cell>{buchung.konto2_name}</Table.Cell>
                                <Table.Cell>{buchung.beschreibung}</Table.Cell>
                                <Table.Cell>{buchung.betrag}</Table.Cell>
                                <Table.Cell><Button
                                    basic color='red'
                                    content='Löschen'
                                    onClick={this.props.deleteBuchung.bind(this, buchung.id)} /></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    buchungen: state.buchungen.buchungen
});

export default connect(
    mapStateToProps,
    { getBuchungen, deleteBuchung }
)(Buchungen);
