import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDevisenWertpapiere, addDeviseWertpapier } from "../../../actions/devisenwertpapiere";

const wertpapierTypOptions = [
    { key: 1, value: 1, text: 'Asset' },
    { key: 2, value: 2, text: 'Cash' }
]

export class DeviseWertpapierForm extends Component {

    state = {
        name: "",
        anzeigesymbol: "",
        symbol: "",
        stueckelung: "",
        wertpapiertyp: ""
    }

    static propTypes = {
        addDeviseWertpapier: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };

    onChange = e => this.setState({
        [e.target.name]:
            e.target.value
    });

    onTypChange = (e, data) => {
        this.setState({
            [data.name]: data.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const owner = user.pk;
        const { name, anzeigesymbol, symbol, stueckelung, wertpapiertyp } = this.state;
        const devisewertpapier = {
            name, anzeigesymbol, symbol, stueckelung, wertpapiertyp, owner
        };
        this.props.addDeviseWertpapier(devisewertpapier);
        this.setState({
            name: "",
            anzeigesymbol: "",
            symbol: "",
            stueckelung: "",
            wertpapiertyp: ""
        });
    };

    render() {
        const { name, anzeigesymbol, symbol, stueckelung, wertpapiertyp } = this.state;

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
                            label='Anzeigesymbol'
                            onChange={this.onChange}
                            value={anzeigesymbol}
                            name="anzeigesymbol"
                        />
                    </Form.Group>
                    <Form.Group width='equal'>
                        <Form.Field>
                            <label>Wertpapiertyp</label>
                            <Dropdown
                                fluid
                                selection
                                value={wertpapiertyp}
                                onChange={this.onTypChange}
                                placeholder='Kontotyp auswählen'
                                options={wertpapierTypOptions}
                                noResultsMessage='Wertpapiertyp nicht gefunden...'
                                name="wertpapiertyp" />
                        </Form.Field>
                        <Form.Input
                            label='Symbol'
                            onChange={this.onChange}
                            value={symbol}
                            name="symbol"
                        />
                        <Form.Input
                            label='Stückelung'
                            onChange={this.onChange}
                            value={stueckelung}
                            name="stueckelung"
                        />
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    devisenwertpapiere: state.devisenwertpapiere.devisenwertpapiere,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getDevisenWertpapiere, addDeviseWertpapier }
)(DeviseWertpapierForm);
