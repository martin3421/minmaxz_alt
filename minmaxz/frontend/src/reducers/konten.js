import { GET_KONTEN } from "../actions/types.js";

const initialState = {
    konten: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_KONTEN:
            return {
                ...state,
                konten: action.payload
            };
        default:
            return state;
    }
}