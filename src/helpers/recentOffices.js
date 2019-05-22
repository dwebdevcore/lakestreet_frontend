export const getOffices = () => {
    let offices = window.sessionStorage.getItem('recentOffices');
    return offices ? JSON.parse(offices) : []
};
export const setOffice = (office) => {
    let offices = window.sessionStorage.getItem('recentOffices');
    offices = offices ? JSON.parse(offices) : [];
    offices = offices.filter(o => o.portal_id !== office.portal_id);
    offices.unshift(office);
    window.sessionStorage.setItem('recentOffices', JSON.stringify(offices));
};
