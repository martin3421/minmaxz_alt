import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBuchung } from "../../../actions/buchungen";
import { getBuchungenListe } from "../../../actions/buchungen_liste";
import { getKonten } from "../../../actions/konten";

export class BuchungForm extends Component {

    state = {
        datum: "",
        konto1: "",
        konto2: "",
        beschreibung: "",
        beschreibung_val: "",
        betrag: "",
    }

    static propTypes = {
        addBuchung: PropTypes.func.isRequired,
        getKonten: PropTypes.func.isRequired,
        getBuchungenListe: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getKonten();
        this.props.getBuchungenListe();
    }

    onChange = e => this.setState({
        [e.target.name]:
            e.target.value
    });

    handleAddition = (e, data) => {
        //this.setState((prevState) => ({
        //  beschreibungOptions: [{ text: value, value }, ...prevState.beschreibungOptions],
        //}))
        const buchungen_anzahl = this.props.buchungen_liste.length + 1;
        const buchung_1 = {
            id: buchungen_anzahl,
            datum: '',
            beschreibung: data.value,
            betrag: 0,
            konto1: 0,
            konto2: 0,
            konto1_name: '',
            konto2_name: ''
        }
        this.props.buchungen_liste.push(buchung_1);
        this.setState({
            beschreibung_val: buchungen_anzahl,
            beschreibung: data.value
        })
    }

    onKontoChange = (e, data) => {
        this.setState({ [data.name]: data.value });
    }

    onBeschreibungChange = (event, data) => {
        const buchung_1 = this.props.buchungen_liste.find(x => x.id === data.value)
        if (typeof buchung_1 !== "undefined") {
            this.setState({
                beschreibung_val: data.value,
                beschreibung: buchung_1.beschreibung,
                konto1: buchung_1.konto1,
                konto2: buchung_1.konto2,
                betrag: buchung_1.betrag
            })
        }
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
            beschreibung_val: "",
            betrag: ""
        });
    };

    render() {
        const { datum, betrag, beschreibung_val, konto1, konto2 } = this.state;
        const kontoOptions = this.props.konten.map(konto => (
            {
                key: konto.id,
                text: konto.name,
                value: konto.id
            }
        ))
        const beschreibungOptions = this.props.buchungen_liste.map(buchung => (
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
                                value={beschreibung_val}
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
                                value={konto2}
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
                                value={konto1}
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
    buchungen_liste: state.buchungen_liste.buchungen_liste
});

export default connect(
    mapStateToProps,
    { getBuchungenListe, getKonten, addBuchung }
)(BuchungForm);
