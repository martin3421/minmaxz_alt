import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBuchung } from "../../../actions/buchungen";
import { getKonten } from "../../../actions/konten";


export class BuchungForm extends Component {
    state = {
        datum: "",
        konto1: "",
        konto2: "",
        beschreibung: "",
        betrag: ""
    }

    static propTypes = {
        addBuchung: PropTypes.func.isRequired,
        getKonten: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getKonten();
    }

    onChange = e => this.setState({
        [e.target.name]:
            e.target.value
    });

    onKontoChange = (e, data) => {
        this.setState({ [data.name]: data.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { datum, konto1, konto2, beschreibung, betrag } = this.state;
        const buchung = { datum, konto1, konto2, beschreibung, betrag };
        this.props.addBuchung(buchung);
    };

    render() {
        const { datum, beschreibung, betrag } = this.state;
        const kontoOptions = this.props.konten.map(konto => (
            {
                key: konto.id,
                text: konto.name,
                value: konto.id
            }
        ))
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Input
                            label='Datum'
                            onChange={this.onChange}
                            value={datum}
                            name="datum"
                            width={3} />
                        <Form.Input
                            label='Beschreibung'
                            onChange={this.onChange}
                            value={beschreibung}
                            name="beschreibung"
                            width={9} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={5}>
                            <label>Zu belasten</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                onChange={this.onKontoChange}
                                placeholder='Select your konto'
                                options={kontoOptions}
                                noResultsMessage='Konto nicht gefunden...'
                                name="konto2" />
                        </Form.Field>
                        <Form.Field width={5}>
                            <label>Buchungskonto</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                onChange={this.onKontoChange}
                                placeholder='Select your konto'
                                options={kontoOptions}
                                noResultsMessage='Konto nicht gefunden...'
                                name="konto1" />
                        </Form.Field>
                        <Form.Input
                            label='Betrag'
                            onChange={this.onChange}
                            value={betrag}
                            name="betrag"
                            width={2} />
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    konten: state.konten.konten
});

export default connect(
    mapStateToProps,
    { getKonten, addBuchung }
)(BuchungForm);
