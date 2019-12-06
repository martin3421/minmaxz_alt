import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_KONTEN, ADD_KONTO } from "./types";
import { tokenConfig } from "./auth";

// GET BUCHUNGEN
export const getKonten = () => (dispatch, getState) => {
    axios
        .get("/haushalt/api/konten/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_KONTEN,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// ADD KONTO
export const addKonto = (konto) => (dispatch, getState) => {
    axios
        .post("/haushalt/api/konten/", konto, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addKonto: "Konto hinzugefügt" }));
            dispatch({
                type: ADD_KONTO,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};