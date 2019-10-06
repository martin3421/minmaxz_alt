import { GET_BUCHUNGEN, DELETE_BUCHUNG, ADD_BUCHUNG, CLEAR_BUCHUNGEN } from "../actions/types.js";

const initialState = {
    buchungen: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BUCHUNGEN:
            return {
                ...state,
                buchungen: action.payload
            };
        case DELETE_BUCHUNG:
            return {
                ...state,
                buchungen: state.buchungen.filter(buchung => buchung.id !== action.payload)
            };
        case ADD_BUCHUNG:
            return {
                ...state,
                buchungen: [...state.buchungen, action.payload]
            };
        case CLEAR_BUCHUNGEN:
            return {
                ...state,
                buchungen: []
            };
        default:
            return state;
    }
}