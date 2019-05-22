import {dateToEpoch} from './format';

const checkAuthUser = () => {
    let user = JSON.parse(localStorage.getItem('authUser'));
    if (user && user.accessToken) {
        if (!validateJWT(user)) {
            return localStorage.removeItem('authUser');
        }
        return user;
    }

    return null;
};
const parseJWT = (token) => JSON.parse(window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));

const validateJWT = (authUser) => {
    let parsed = parseJWT(authUser.accessToken);
    //1536792385
    if (parsed && parsed.exp) {
        return dateToEpoch(new Date()) <= parsed.exp;
    }
};
export {checkAuthUser};