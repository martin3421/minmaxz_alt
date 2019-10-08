import { combineReducers } from "redux";
import buchungen from './buchungen';
import konten from './konten';
import errors from './errors';
import messages from './messages';


export default combineReducers({
    buchungen,
    konten,
    errors,
    messages
});