import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_KONTEN } from "./types";

// GET BUCHUNGEN
export const getKonten = () => dispatch => {
    axios
        .get("/haushalt/api/konten/")
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