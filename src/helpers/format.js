export const formatName = name => name ? name : '';
export const classNames = classes => [...classes].join(' ');
export const epochToDate = seconds => {
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(seconds);
    return d;
};

export const dateToEpoch = date => Math.round(new Date(date).getTime() / 1000);


export const servicesToRoute = services => services.map(service => {
    return {title: service.text, path: `/doctors-chair/${service.taxonomy_id}`}
});
