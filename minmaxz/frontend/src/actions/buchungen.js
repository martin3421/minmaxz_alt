import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_BUCHUNGEN, DELETE_BUCHUNG, ADD_BUCHUNG } from "./types";
import { tokenConfig } from "./auth";

// GET BUCHUNGEN
export const getBuchungen = () => (dispatch, getState) => {
    axios
        .get("/haushalt/api/buchungen/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_BUCHUNGEN,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE BUCHUNG
export const deleteBuchung = (id) => dispatch => {
    axios
        .delete(`/haushalt/api/buchungen/${id}/`)
        .then(res => {
            dispatch(createMessage({ deleteBuchung: "Buchung gelöscht" }));
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
            dispatch(createMessage({ addBuchung: "Buchung hinzugefügt" }));
            dispatch({
                type: ADD_BUCHUNG,
                payload: res.data
            });
        })
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status)));
};