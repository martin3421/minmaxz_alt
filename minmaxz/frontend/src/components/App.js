import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom";
import Header from './layout/Header';
import Dashboard from './haushalt/buchungen/Dashboard';
import Alerts from "./layout/Alerts";
import { Container } from 'semantic-ui-react'

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from "react-redux";
import store from "../store";

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center"
};

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <Container>
                            <Dashboard />
                        </Container>
                    </Fragment>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
