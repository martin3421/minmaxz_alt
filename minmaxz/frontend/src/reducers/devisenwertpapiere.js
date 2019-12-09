import { GET_DEVISENWERTPAPIERE, ADD_DEVISEWERTPAPIER } from "../actions/types.js";

const initialState = {
    devisenwertpapiere: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEVISENWERTPAPIERE:
            return {
                ...state,
                devisenwertpapiere: action.payload
            };
        case ADD_DEVISEWERTPAPIER:
            return {
                ...state,
                devisenwertpapiere: [...state.devisenwertpapiere, action.payload]
            };
        default:
            return state;
    }
}