import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_DEVISENWERTPAPIERE, ADD_DEVISEWERTPAPIER } from "./types";
import { tokenConfig } from "./auth";

// GET DEVISENWERTPAPIERE
export const getDevisenWertpapiere = () => (dispatch, getState) => {
    axios
        .get("/haushalt/api/devisenwertpapiere/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_DEVISENWERTPAPIERE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// ADD DEVISEWERTPAPIERE
export const addDeviseWertpapier = (devisewertpapier) => (dispatch, getState) => {
    axios
        .post("/haushalt/api/devisenwertpapiere/", devisewertpapier, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addDeviseWertpapier: "Devise/Wertpapier hinzugefügt" }));
            dispatch({
                type: ADD_DEVISEWERTPAPIER,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};