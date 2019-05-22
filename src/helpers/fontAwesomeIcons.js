import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faBold,
    faItalic,
    faUnderline,
    faCode,
    faHeading,
    faQuoteRight,
    faListOl,
    faListUl,
    faBars,
    faDollarSign,
    faSearch,
    faLink,
    faCaretDown,
    faArrowLeft,
    faCogs,
    faClock,
    faCreditCard,
    faMoneyBillAlt,
    faUsers,
    faHeartbeat,
    faColumns,
    faLaptop,
    faGripVertical,
    faPlusCircle,
    faMinusCircle,
    faCamera,
    faPlusSquare,
    faMinusSquare,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faCalendarAlt,
    faArrowsAltV,
    faPalette,
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookSquare,
    faTwitter,
    faInstagram,
    faYoutube,
    faSnapchatGhost,
    faBloggerB
} from '@fortawesome/free-brands-svg-icons';

let icons = [
    faBold,
    faItalic,
    faUnderline,
    faCode,
    faHeading,
    faQuoteRight,
    faListOl,
    faListUl, faBars, faDollarSign, faEdit, faPalette, faArrowsAltV, faCalendarAlt, faChevronLeft, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faCamera, faMinusCircle, faPlusCircle, faGripVertical, faSearch, faLink, faCaretDown, faArrowLeft, faCogs, faClock, faCreditCard, faMoneyBillAlt, faUsers, faHeartbeat, faColumns, faLaptop
];

export const addIcons = () => {
    library.add(...icons, ...socialIcons);
};
//library.add DOESN'T WORK for brand icons so need to export them directly
export const socialIcons = {faBloggerB, faSnapchatGhost, faYoutube, faInstagram, faFacebookSquare, faTwitter};