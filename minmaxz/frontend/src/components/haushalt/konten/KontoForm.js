import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addKonto } from "../../../actions/konten";
import { getKonten } from "../../../actions/konten";
const kontoTypOptions = [
    { key: 1, value: 1, text: 'Asset' },
    { key: 2, value: 2, text: 'Cash' },
    { key: 3, value: 3, text: 'Bank' },
    { key: 4, value: 4, text: 'Mutual' },
    { key: 5, value: 5, text: 'Liability' },
    { key: 6, value: 6, text: 'Credit' },
    { key: 7, value: 7, text: 'Income' },
    { key: 8, value: 8, text: 'Expense' },
    { key: 9, value: 9, text: 'Equity' }
  ]

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
        const konto_1 = this.props.konto.find(x => x.id === data.value)
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
        const { name, beschreibung, steuerrelevant, platzhalter, 
            devise_wertpapier_id, elternkonto_id, kontotyp_id, owner_id, ebene } = this.state;
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
                            label='Name'
                            onChange={this.onChange}
                            value={name}
                            name="name"
                            width={3} />
                        <Form.Input
                            label='Beschreibung'
                            onChange={this.onChange}
                            value={beschreibung}
                            name="beschreibung"
                            width={3} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={5}>
                            <label>Elternkonto</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                value={elternkonto_id}
                                onChange={this.onKontoChange}
                                placeholder='Elternkonto auswählen'
                                options={kontoOptions}
                                noResultsMessage='Konto nicht gefunden...'
                                name="elternkonto_id" />
                        </Form.Field>
                        <Form.Field width={5}>
                            <label>Kontotyp</label>
                            <Dropdown
                                fluid
                                selection
                                value={kontotyp_id}
                                onChange={this.onKontoChange}
                                placeholder='Kontotyp auswählen'
                                options={kontoTypOptions}
                                noResultsMessage='Kontotyp nicht gefunden...'
                                name="kontotyp_id" />
                        </Form.Field>
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
