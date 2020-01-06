import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addKonto, getKonten, getKonto } from "../../../actions/konten";
import { getDevisenWertpapiere } from "../../../actions/devisenwertpapiere";
import axios from "axios";
import { tokenConfig } from "../../../actions/auth";

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
        steuerrelevant: false,
        platzhalter: false,
        devise_wertpapier: "",
        elternkonto: "",
        kontotyp: "",
        ebene: ""
    }

    static propTypes = {
        addKonto: PropTypes.func.isRequired,
        getKonten: PropTypes.func.isRequired,
        getKonto: PropTypes.func.isRequired,
        getDevisenWertpapiere: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getKonten();
        this.props.getDevisenWertpapiere();
        this.props.getKonto(40);
        console.log(this.props)
        const token = this.props.auth.token;

        // Headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        // If token, add to headers config
        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }
        axios
            .get(`/haushalt/api/konten/${40}/`, config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err =>
                console.log(err)
            );
    }

    onChange = e => this.setState({
        [e.target.name]:
            e.target.value
    });

    onKontoTypChange = (e, data) => {
        this.setState({
            [data.name]: data.value
        });
    }

    onCheckboxChange = (e, data) => {
        this.setState({
            [data.name]: data.checked,
        });
    }

    onKontoChange = (e, data) => {
        const konto_1 = this.props.konten.find(x => x.id === data.value)
        this.setState({
            [data.name]: data.value,
            ebene: konto_1.ebene + 1
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const owner = user.pk;
        const { name, beschreibung, steuerrelevant, platzhalter,
            devise_wertpapier, elternkonto, kontotyp, ebene } = this.state;
        const konto = {
            name, beschreibung, steuerrelevant, platzhalter,
            devise_wertpapier, elternkonto, kontotyp, owner, ebene
        };
        this.props.addKonto(konto);
        this.setState({
            name: "",
            beschreibung: "",
            steuerrelevant: false,
            platzhalter: false,
            devise_wertpapier: "",
            elternkonto: "",
            kontotyp: "",
            ebene: ""
        });
    };

    render() {
        const { name, beschreibung, elternkonto, kontotyp, platzhalter, steuerrelevant, devise_wertpapier } = this.state;

        const kontoOptions = this.props.konten.map(konto => (
            {
                key: konto.id,
                text: konto.name,
                value: konto.id
            }
        ))
        const devisenwertpapiereOptions = this.props.devisenwertpapiere.map(devisewertpapier => (
            {
                key: devisewertpapier.id,
                text: devisewertpapier.name,
                value: devisewertpapier.id
            }
        ))

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group width='equal'>
                        <Form.Input
                            label='Name'
                            onChange={this.onChange}
                            value={name}
                            name="name"
                        />
                        <Form.Input
                            label='Beschreibung'
                            onChange={this.onChange}
                            value={beschreibung}
                            name="beschreibung"
                        />
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Form.Field>
                            <label>Elternkonto</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                value={elternkonto}
                                onChange={this.onKontoChange}
                                placeholder='Elternkonto auswählen'
                                options={kontoOptions}
                                noResultsMessage='Konto nicht gefunden...'
                                name="elternkonto" />
                        </Form.Field>
                        <Form.Field>
                            <label>Kontotyp</label>
                            <Dropdown
                                fluid
                                selection
                                value={kontotyp}
                                onChange={this.onKontoTypChange}
                                placeholder='Kontotyp auswählen'
                                options={kontoTypOptions}
                                noResultsMessage='Kontotyp nicht gefunden...'
                                name="kontotyp" />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <label>Devise/Wertpapier</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                value={devise_wertpapier}
                                onChange={this.onKontoTypChange}
                                placeholder='Devise/Wertpapier auswählen'
                                options={devisenwertpapiereOptions}
                                noResultsMessage='Konto nicht gefunden...'
                                name="devise_wertpapier" />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Form.Checkbox
                            label='Platzhalter Konto'
                            onChange={this.onCheckboxChange}
                            name='platzhalter'
                            checked={platzhalter}
                        />
                        <Form.Checkbox
                            label='Steuerrelevant'
                            onChange={this.onCheckboxChange}
                            name='steuerrelevant'
                            checked={steuerrelevant}
                        />
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    konten: state.konten.konten,
    konto: state.konten.konto,
    devisenwertpapiere: state.devisenwertpapiere.devisenwertpapiere,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getKonten, getKonto, addKonto, getDevisenWertpapiere }
)(KontoForm);
