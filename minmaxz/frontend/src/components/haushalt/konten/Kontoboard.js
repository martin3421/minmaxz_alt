import React, { Fragment } from 'react'
import Konten from './Konten'
import KontoForm from './KontoForm'
//import BuchungForm from './BuchungForm'

export default function Kontoboard() {
    return (
        <Fragment>
            <Konten />
            <KontoForm />
        </Fragment>
    )
}