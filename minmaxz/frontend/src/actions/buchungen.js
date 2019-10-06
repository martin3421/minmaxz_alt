import axios from "axios";

import { GET_BUCHUNGEN, DELETE_BUCHUNG, ADD_BUCHUNG, GET_ERRORS } from "./types";

// GET BUCHUNGEN
export const getBuchungen = () => dispatch => {
    axios
        .get("/haushalt/api/buchungen/")
        .then(res => {
            dispatch({
                type: GET_BUCHUNGEN,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err)
        );
};

// DELETE BUCHUNG
export const deleteBuchung = (id) => dispatch => {
    axios
        .delete(`/haushalt/api/buchungen/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_BUCHUNG,
                payload: id
            });
        })
        .catch(err =>
            console.log(err)
        );
};

// ADD BUCHUNG
export const addBuchung = (buchung) => dispatch => {
    axios
        .post("/haushalt/api/buchungen/", buchung)
        .then(res => {
            dispatch({
                type: ADD_BUCHUNG,
                payload: res.data
            });
        })
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        });
};