/* Action types */
const SHOW_LOGIN_FORM = "dotmocracy/UI/SHOW_LOGIN_FORM";
const SHOW_REGISTER_FORM = "dotmocracy/UI/SHOW_REGISTER_FORM";
const HIDE_AUTH_FORM = "dotmocracy/UI/HIDE_AUTH_FORM";

/* State login_form_flags */
export const login_form_flags = {
    AUTH_FORM_OFF: 0,
    LOGIN_FORM_ON: 1,
    REGISTER_FORM_ON: 2,
};

/* Reducer */
const initial_state = {
    login_form: login_form_flags.AUTH_FORM_OFF,
};

export default function reducer( state = initial_state, action = {} ) {
    switch ( action.type ) {
        case SHOW_LOGIN_FORM:
            return { ...state, login_form: login_form_flags.LOGIN_FORM_ON };
        case SHOW_REGISTER_FORM:
            return { ...state, login_form: login_form_flags.REGISTER_FORM_ON };
        case HIDE_AUTH_FORM:
            return { ...state, login_form: login_form_flags.AUTH_FORM_OFF };
        default:
            return state;
    }
}

/* Action creators */
export const showLoginForm = () => ({
    type: SHOW_LOGIN_FORM
});

export const showRegisterForm = () => ({
    type: SHOW_REGISTER_FORM
});

export const hideLoginRegisterForm = () => ({
    type: HIDE_AUTH_FORM
});