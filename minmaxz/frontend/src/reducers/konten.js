import { GET_KONTEN, ADD_KONTO, GET_KONTO } from "../actions/types.js";

const initialState = {
    konten: [],
    konto: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_KONTEN:
            return {
                ...state,
                konten: action.payload
            };
        case GET_KONTO:
            return {
                ...state,
                konto: action.payload
            };
        case ADD_KONTO:
            return {
                ...state,
                konten: [...state.konten, action.payload]
            };
        default:
            return state;
    }
}