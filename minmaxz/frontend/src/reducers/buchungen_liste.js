import { GET_BUCHUNGEN_LISTE } from "../actions/types.js";

const initialState = {
    buchungen_liste: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BUCHUNGEN_LISTE:
            return {
                ...state,
                buchungen_liste: action.payload
            };
        default:
            return state;
    }
}