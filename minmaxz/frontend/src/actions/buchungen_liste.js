import axios from "axios";
import { returnErrors } from "./messages";

import { GET_BUCHUNGEN_LISTE } from "./types";
import { tokenConfig } from "./auth";

// GET BUCHUNGEN_LISTE
export const getBuchungenListe = () => (dispatch, getState) => {
    axios
        .get("/haushalt/api/buchungen_liste/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_BUCHUNGEN_LISTE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};