import React, { Fragment } from 'react'
import Buchungen from './Buchungen'
import BuchungForm from './BuchungForm'

export default function Dashboard() {
    return (
        <Fragment>
            <Buchungen />
            <BuchungForm />
        </Fragment>

    )
}
