const dnn_domain = process.env.REACT_APP_DNN_DOMAIN;
const heartland_domain = process.env.REACT_APP_HEARTLAND_DOMAIN;

export const endPoints = {
    // Heartland APIs (local)
    SEARCH_OFFICE: `${heartland_domain}/webservices/office-search/v1/`,
    SEARCH_DOCTOR: `${heartland_domain}/webservices/doctor-search/v1/`,
    TELEMETRY:     `${heartland_domain}/telemetry/v1/`,

    // DNN APIs (external)
    LOGIN:                                             `${dnn_domain}/login/`,
    METADATA:               portal_id =>               `${dnn_domain}/${portal_id}/metadata/`,
    PROMOTIONS:             (portal_id, id) =>         `${dnn_domain}/${portal_id}/promotions/${id ? id + '/' : ''}/`,
    CUSTOMIZE_HOME:         portal_id =>               `${dnn_domain}/${portal_id}/customize-home/`,
    CUSTOMIZE_HOME_ARRANGE: portal_id =>               `${dnn_domain}/${portal_id}/customize-home/arrange/`,

    // Dental team
    DENTAL_TEAM:        portal_id =>                   `${dnn_domain}/${portal_id}/dental-team/`,
    DENTAL_TEAM_MEMBER: (portal_id, team_member_id) => `${dnn_domain}/${portal_id}/dental-team/${team_member_id}/`,
    DENTAL_TEAM_BIO:    (portal_id, team_member_id) => `${dnn_domain}/${portal_id}/dental-team/${team_member_id}/bio/`,

    // Doctors
    DOCTORS:            (portal_id, npi) =>            `${dnn_domain}/${portal_id}/doctors/${npi ? npi + '/' : ''}`,
    DOCTORS_BIO:        npi =>                         `${dnn_domain}/doctors/${npi}/bio/`,

    // Services
    SERVICES:           (portal_id, taxonomy_id) =>    `${dnn_domain}/${portal_id}/services/${taxonomy_id ? taxonomy_id + '/' : ''}`,
    DENTIST_CHAIR:      (portal_id, taxonomy_id) =>    `${dnn_domain}/${portal_id}/services/dentist-chair/${taxonomy_id ? taxonomy_id + '/' : ''}`,

    // Featured Services
    FEATURED_SERVICES:           (portal_id, taxonomy_id) =>    `${dnn_domain}/${portal_id}/services/featured/${taxonomy_id ? taxonomy_id + '/' : ''}`,

    // Preview
    PREVIEW: (content_url, tld) => `http://www.${content_url}.${tld}.s3-website-us-east-1.amazonaws.com/`,

    // PUBLISH
    PUBLISH_OFFICE: (portal_id) =>  `${dnn_domain}/${portal_id}/publish/`,

    // Cloudinary
    CLOUDINARY_IMAGE_LIST: portal_id => `https://res.cloudinary.com/heartland-dental/image/list/smilegallery_${portal_id}.json`
};