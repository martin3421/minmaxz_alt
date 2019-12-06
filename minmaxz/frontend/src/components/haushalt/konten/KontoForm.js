import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addKonto } from "../../../actions/konten";
import { getKonten } from "../../../actions/konten";

export class KontoForm extends Component {

    state = {
        name: "",
        beschreibung: "",
        steuerrelevant: "",
        platzhalter: "",
        devise_wertpapier_id: "",
        elternkonto_id: "",
        kontotyp_id: "",
        owner_id: "",
        ebene: ""
    }

    static propTypes = {
        addKonto: PropTypes.func.isRequired,
        getKonten: PropTypes.func.isRequired,
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
        const { name, beschreibung, steuerrelevant, platzhalter, 
            devise_wertpapier_id, elternkonto_id, kontotyp_id, owner_id, ebene } = this.state;
        const konto = { name, beschreibung, steuerrelevant, platzhalter, 
            devise_wertpapier_id, elternkonto_id, kontotyp_id, owner_id, ebene };
        this.props.addKonto(konto);
        this.setState({
            name: "",
            beschreibung: "",
            steuerrelevant: "",
            platzhalter: "",
            devise_wertpapier_id: "",
            elternkonto_id: "",
            kontotyp_id: "",
            owner_id: "",
            ebene: ""
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
