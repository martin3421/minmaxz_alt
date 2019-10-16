import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBuchung, getBuchungen } from "../../../actions/buchungen";
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
        getKonten: PropTypes.func.isRequired,
        getBuchungen: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getKonten();
        this.props.getBuchungen();
    }

    onChange = e => this.setState({
        [e.target.name]:
            e.target.value
    });

    handleAddition = (e, { value }) => {
        this.setState((prevState) => ({
          options: [{ text: value, value }, ...prevState.options],
        }))
      }

    onKontoChange = (e, data) => {
        this.setState({ [data.name]: data.value });
    }

    onBeschreibungChange = (e, data) => {
        this.setState({ [data.name]: data.value })
        console.log(this.props.buchungen.id)
        console.log(data.value)
    }

    onSubmit = e => {
        e.preventDefault();
        const { datum, konto1, konto2, beschreibung, betrag } = this.state;
        const buchung = { datum, konto1, konto2, beschreibung, betrag };
        this.props.addBuchung(buchung);
        this.setState({
            datum: "",
            konto1: "",
            konto2: "",
            beschreibung: "",
            betrag: ""
        });
    };

    render() {
        const { datum, betrag } = this.state;
        const kontoOptions = this.props.konten.map(konto => (
            {
                key: konto.id,
                text: konto.name,
                value: konto.id
            }
        ))
        const beschreibungOptions = this.props.buchungen.map(buchung => (
            {
                key: buchung.id,
                text: buchung.beschreibung,
                value: buchung.id
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
                        <Form.Field width={9}>
                            <label>Beschreibung</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                allowAdditions
                                onChange={this.onBeschreibungChange}
                                placeholder='Beschreibung'
                                options={beschreibungOptions}
                                onAddItem={this.handleAddition}
                                name="beschreibung" />
                        </Form.Field>
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
    konten: state.konten.konten,
    buchungen: state.buchungen.buchungen
});

export default connect(
    mapStateToProps,
    { getBuchungen, getKonten, addBuchung }
)(BuchungForm);
