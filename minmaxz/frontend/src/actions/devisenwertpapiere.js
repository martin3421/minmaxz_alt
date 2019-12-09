import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_DEVISENWERTPAPIERE } from "./types";
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