import React, { Fragment } from 'react'
import Konten from './Konten'
import KontoForm from './KontoForm'
import DeviseWertpapierForm from './DeviseWertpapierForm'

export default function Kontoboard() {
    return (
        <Fragment>
            <Konten />
            <KontoForm />
            <DeviseWertpapierForm />
        </Fragment>
    )
}