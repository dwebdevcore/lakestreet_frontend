import dental from '../assets/images/dental-services.png';
//import services from '../assets/images/services.png';
import about from '../assets/images/about-alternative.png';
//import directions from '../assets/images/directions.png';
import doctorBioPromo from '../assets/images/doctor-bio.png';
import googleMap2 from '../assets/images/google-block2.png';
import googleMap3 from '../assets/images/google-block3.png';
import smileGallery from '../assets/images/smile-gallery.png';
import featured from '../assets/images/featured-services.png';
import missionStatement from '../assets/images/mission-statement.png';
import meetTheTeam from '../assets/images/meet-the-team1.png';
import promo1 from '../assets/images/promo1.png';
import promo2 from '../assets/images/promo2.png';

let images = [
    {name: 'promo1', image: promo1},
    {name: 'promo2', image: promo2},
    {name: 'featured_services', image: featured},
    {name: 'dental_services', image: dental},
    {name: 'doctor_bio', image: doctorBioPromo},
    {name: 'about_office', image: about},
    {name: 'driving_directions', image: googleMap3},
/*    {name: 'google_block', image: googleMap2},
    {name: 'smile_gallery', image: smileGallery},*/
    {name: 'google', image: googleMap2},
    {name: 'smile_gallery', image: smileGallery},
    {name: "mission_statement", image: missionStatement},
    {name: 'meet_the_team', image: meetTheTeam},
];
const getImage = name => {
    let image = images.filter(image => image.name === name)[0];

    return image ? image.image : null;
};
export const removePromo2 = widgets => {
    let promo2Index = widgets.findIndex(x => x.promo2 === true);
    return widgets.splice(promo2Index, 1);
};
export const insertPromo2 = widgets => {
    widgets.splice(3, 0, {
        name: 'promo2',
        image: promo2,
        isPromo: true,
        disabled: true,
        promo2: true
    });
    return widgets;
};
export const insertPromo1 = widgets => {
    widgets.splice(0, 0, {
        name: 'promo1',
        image: promo1,
        isPromo: true,
        disabled: true
    });
    return widgets;
};
export const formatHomeWidgets = widgets => {
    return insertPromo2(insertPromo1(widgets.map(widget => {
        return Object.assign({}, widget, {
            image: getImage(widget.name)
        });
    })));
};
export const formatWidgetsBeforeArrange = widgets => {
    return widgets.filter(widget => !widget.isPromo).map(widget => {
        return widget.name;
    });
};
export const formatWidgetsAfterArrange = widgets => {
    return widgets.map(widget => {
        return {
            name: widget,
            enabled: true
        };
    });
};