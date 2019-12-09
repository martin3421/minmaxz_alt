import { combineReducers } from "redux";
import buchungen from './buchungen';
import buchungen_liste from './buchungen_liste';
import konten from './konten';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import devisenwertpapiere from './devisenwertpapiere';


export default combineReducers({
    buchungen,
    konten,
    devisenwertpapiere,
    errors,
    messages,
    auth,
    buchungen_liste
});