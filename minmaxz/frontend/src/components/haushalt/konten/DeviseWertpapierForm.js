import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addKonto } from "../../../actions/konten";

export class KontoForm extends Component {

    state = {
        name: "",
        beschreibung: "",
        steuerrelevant: false,
        platzhalter: false,
        devise_wertpapier: 1,
        elternkonto: "",
        kontotyp: "",
        ebene: ""
    }

    static propTypes = {
        addKonto: PropTypes.func.isRequired,
        getKonten: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getKonten();
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
            [data.name]: data.checked
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
            devise_wertpapier: 1,
            elternkonto: "",
            kontotyp: "",
            ebene: ""
        });
    };

    render() {
        const { name, beschreibung, elternkonto, kontotyp, steuerrelevant, platzhalter } = this.state;
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
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getKonten, addKonto }
)(KontoForm);
