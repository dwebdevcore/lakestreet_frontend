import React from 'react';
import {generate} from 'randomstring';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {CustomizeHome} from '../components/CustomizeHome';
import alpha from '../assets/images/alpha.png';
import beta from '../assets/images/beta.png';
import charlie from '../assets/images/charlie.png';
import about1 from '../assets/images/about1.png';
import about2 from '../assets/images/about2.png';
import invisalign from '../assets/images/invisalign.png';
import {getItemsByPortalId} from "../selectors";
import {bindActionCreators} from "redux";
import {
    loadCustomizeHome,
    updateCustomizeHome,
    //loadHomeWidgets,
    loadFeaturedServices,
    updateFeaturedServices,
    updateHomeWidgets,
    cloudinaryUploadSingleImage,
    cloudinaryLoadImages
} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import {arrayMove} from "react-sortable-hoc";
import {formatHomeWidgets, formatWidgetsBeforeArrange, insertPromo2, removePromo2} from '../helpers/homeWidgetsHelper';
import {cloudinaryConfig} from '../config/cloudinary';
import {withAuth} from '../components/Auth';

class CustomizeHomeContainer extends React.Component {
    static propTypes = {
        //myProp: PropTypes.string.isRequired
    };
    state = {
        colors: ['white', 'sand', 'stone'],
        templates: [
            {title: 'alpha', image: alpha},
            {title: 'beta', image: beta},
            {title: 'charlie', image: charlie},
        ],
        buttons: ['tab', 'pill', 'block'],
        widgets: {
            doctor_bio: {
                enabled: false
            },
            featured_services: {
                enabled: false
            },
            meet_the_team: {
                enabled: false
            },
            smile_gallery: {
                enabled: false
            },
            google_block: {
                reviews: false,
                map: false,
                enabled: false,
                virtual_tour: false
            },
            mission_statement: {
                text: "",
                enabled: false
            }
        },
        aboutList: [
            {title: 'default', image: about1},
            {title: 'office collage', image: about2},
        ],
        invisalignList: [
            {
                title: 'Invisalign Preferred',
                description: 'Is the practice/ doctor an Invisalign Preferred Provider',
                image: invisalign,
                checked: false
            },
        ],
        homeWidgets: [],
        homeWidgetsUpdated: false,
        accent_color: 'white',
        template: 'alpha',
        about_section: 'default',
        button_style: 'pill',
        googleMapSelectedWidget: 1,
        brand_badges: [],
        updatedProperties: [],
        smileGalleryFile: null,
        smileGalleryFilename: null,
        smileGalleryDialogOpen: false,
        smileGalleryImages: [],
        featuredServices: [],
        featuredServicesUpdated: false,
        allServicesList: [],
        exteriorOfficePhotoFile: null
    };

    componentDidMount() {
        let portalId = this.props.match.params.id;
        if (portalId && !this.props.customizeHome) {
            this.props.loadCustomizeHome(portalId);
        }
        /*   if (portalId && !this.props.homeWidgets) {
               this.props.loadHomeWidgets(portalId);
           }*/
        if (portalId && !this.props.cloudinaryImageList) {
            this.props.cloudinaryLoadImages(portalId);
        }
        if (portalId && !this.props.featuredServices) {
            this.props.loadFeaturedServices(portalId);
        }
        this.initValues(this.props);

    }

    componentWillReceiveProps(nextProps) {
        let {customizeHome, homeWidgets} = nextProps;
        if (customizeHome && (customizeHome !== this.state.customizeHome)) {
            this.initValues(nextProps);
        }
        if (homeWidgets && (homeWidgets !== this.state.homeWidgets)) {
            this.initValues(nextProps);
        }
    }

    initValues(props) {
        if (props.customizeHome) {
            let {widgets} = props.customizeHome;

            if (widgets && widgets.mission_statement.text === null) {
                widgets.mission_statement.text = '';
            }
            if (widgets && widgets.google_block.enabled) {
                this.setState({
                    googleMapSelectedWidget: this.determineGoogleBlockMode(widgets.google_block)
                });
            }
            this.setState({
                template: props.customizeHome.template,
                accent_color: props.customizeHome.accent_color,
                button_style: props.customizeHome.button_style,
                about_section: props.customizeHome.about_section,
                widgets: widgets,
                brand_badges: props.customizeHome.brand_badges,
            });

        }
        if (props.homeWidgets) {
            this.setState({
                homeWidgets: formatHomeWidgets(props.homeWidgets)
            });
        }

        if (props.featuredServices) {
            this.setState({
                featuredServices: props.featuredServices
            });
        }

        if (this.props.services) {
            let allServicesList = [];
            this.props.services.map(service => {
                allServicesList.push(service);
                if (service.children) {
                    service.children.map(c => allServicesList.push(c));
                }
                return service;
            });
            this.setState({
                allServicesList: allServicesList
            });
        }
    }

    handleSaveDraft = () => {
        let portalId = this.props.match.params.id;
        let {brand_badges, about_section, button_style, template, widgets, accent_color} = this.state;
        if (portalId) {
            this.props.updateCustomizeHome({
                portal_id: portalId,
                item: {
                    brand_badges, about_section, button_style, template, widgets, accent_color
                }
            });

            if (this.state.homeWidgetsUpdated) {
                this.props.updateHomeWidgets({
                    portal_id: portalId,
                    item: formatWidgetsBeforeArrange(this.state.homeWidgets)
                });
                this.setState({homeWidgetsUpdated: false});
            }


            if (this.state.featuredServicesUpdated) {
                this.props.updateFeaturedServices({
                    portal_id: portalId,
                    featuredServices: this.state.featuredServices
                });

                this.setState({featuredServicesUpdated: false});
            }

            if (this.state.exteriorOfficePhotoFile) {
                let payload = {
                    portal_id: portalId,
                    item: {file: this.state.exteriorOfficePhotoFile},
                    public_id: 'exterior',
                    folder: cloudinaryConfig.exteriorOfficePhotoFolder(portalId),
                    tag: `exterior_office_photo_${portalId}`
                };
                this.props.cloudinaryUploadSingleImage(payload);
            }
        }
    };
    handlePreview = () => {
        console.log('handle preview');
    };
    handlePublish = () => {
        console.log('handle publish');
    };
    handleRadioChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value});
        if (name === 'googleMapSelectedWidget') {
            this.googleMapToggleWidgets();
        }
    };
    handleGoogleMapWidgetRadioChange = (e) => {
        let {widgets} = this.state;
        widgets.google_block = this.setGoogleBlockData(+e.target.value);
        this.setState({
            widgets: widgets,
            googleMapSelectedWidget: +e.target.value
        });
    };
    handleCheckboxChange = (e) => {
        let {widgets} = {...this.state};
        widgets[e.target.name].enabled = e.target.checked;
        this.setState(widgets);
    };
    handleBrandBadgeChange = (badge) => {
        this.setState({
            brand_badges: [...this.state.brand_badges.map(b => {
                if (b.type === badge.type) {
                    b.enabled = !b.enabled;
                }
                return b;
            })]
        });
    };
    handleTextChange = (e) => {
        let {widgets} = {...this.state};
        //avoiding mutation for a pure component Widget correct re-render
        this.setState({
            widgets: {
                ...widgets, ...{
                    [e.target.name]: {
                        ...widgets[e.target.name], ...{
                            text: e.target.value
                        }
                    }
                }
            }
        });
    };

    handleHomeWidgetsSortEnd = ({oldIndex, newIndex}) => {

        let newArray = arrayMove(this.state.homeWidgets, oldIndex, newIndex);

        /*Those methods aren't combined because of separate usage
        * In another parts of app
        * */
        removePromo2(newArray);
        insertPromo2(newArray);

        this.setState({
            homeWidgets: newArray,
            homeWidgetsUpdated: true
        });
    };

    handleSignedWaiverConfirm = (e) => {
        e.preventDefault();
        let portalId = this.props.match.params.id;
        let payload = {
            portal_id: portalId,
            item: {file: this.state.smileGalleryFile},
            public_id: this.state.smileGalleryFilename,
            folder: cloudinaryConfig.smileGalleryFolder(portalId),
            tag: `smilegallery_${portalId}`
        };
        this.props.cloudinaryUploadSingleImage(payload);
        this.toggleModalOpen(null);
    };
    toggleModalOpen = () => {
        this.setState({
            smileGalleryDialogOpen: !this.state.smileGalleryDialogOpen,
        });
    };
    handleExteriorOfficePhotoImageChange = (item) => {
        this.setState({exteriorOfficePhotoFile: item.file});
    };
    handleSmileGalleryImageChange = (item) => {
        this.setState({
            smileGalleryFile: item.file,
            smileGalleryFilename: generate(10)
        });
        this.toggleModalOpen(null);
    };
    handleSmileGalleryImageCheck = (e, image) => {
        let checked = e.target.checked;
        let images = this.state.widgets.smile_gallery.images;
        if (!checked) {
            images = images.filter(img => img.cloudinary_path !== image.public_id);
        } else {
            images = [...images, {
                has_waiver: true,
                cloudinary_path: image.public_id,
                url: `${cloudinaryConfig.resImageUrl}v1/${image.public_id}`
            }];
        }
        this.setState({
            widgets: {
                ...this.state.widgets, ...{
                    smile_gallery: {
                        ...this.state.widgets.smile_gallery, ...{
                            images: images
                        }
                    },
                }
            }
        })
    };
    handleFeaturedServicesChange = (e, index) => {
        let service = this.state.allServicesList.filter(s => s.taxonomy_id === e.target.value)[0];
        if (service) {
            let {featuredServices} = this.state;
            featuredServices[index] = {
                taxonomy_id: service.taxonomy_id,
                text: service.text
            };
            this.setState({
                featuredServices: featuredServices,
                featuredServicesUpdated: true
            });
        }

    };
    determineGoogleBlockMode = (data) => {

        if (!data.enabled) return null;
        if ((Object.keys(data).map(k => data[k]).reduce((t, a) => t + a) - 1) !== 2) return null;

        // Determine the intended mode
        if (data.map && data.reviews) {
            // Map & Reviews
            return 1;
        }
        else if (data.virtual_tour && data.reviews) {
            // Virtual Tour & Reviews
            return 2;
        }
        else if (data.virtual_tour && data.map) {
            // Virtual Tour & Map
            return 3;
        }
        else {
            return null;
        }
    };
    setGoogleBlockData = (mode) => {
        const modes = {
            // Maps & Reviews
            1: {enabled: true, map: true, reviews: true, virtual_tour: false},

            // Virtual Tour & Reviews
            2: {enabled: true, map: false, reviews: true, virtual_tour: true},

            // Virtual Tour & Map
            3: {enabled: true, map: true, reviews: false, virtual_tour: true},
        };

        return modes[Number(mode)] ? modes[Number(mode)] : null;
    };

    render() {
        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Select site Theme'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                <CustomizeHome
                    widgets={this.state.widgets}
                    homeWidgets={this.state.homeWidgets}
                    aboutSection={this.state.about_section}
                    accentColor={this.state.accent_color}
                    template={this.state.template}
                    buttonStyle={this.state.button_style}
                    buttons={this.state.buttons}
                    colors={this.state.colors}
                    googleMapSelectedWidget={this.state.googleMapSelectedWidget}
                    onGoogleMapWidgetRadioChange={this.handleGoogleMapWidgetRadioChange}
                    templates={this.state.templates}
                    aboutList={this.state.aboutList}
                    brandBadges={this.state.brand_badges}
                    widgetsPromo={this.state.widgetsPromo}
                    onRadioChange={this.handleRadioChange}
                    onCheckboxChange={this.handleCheckboxChange}
                    onTextChange={this.handleTextChange}
                    onSortEnd={this.handleHomeWidgetsSortEnd}
                    onBrandBadgeChange={this.handleBrandBadgeChange}
                    onImageChange={this.handleSmileGalleryImageChange}
                    onImageCheck={this.handleSmileGalleryImageCheck}
                    smileGalleryFilename={this.state.smileGalleryFilename}
                    smileGalleryDialogOpen={this.state.smileGalleryDialogOpen}
                    onSmileGalleryDialogConfirm={this.handleSignedWaiverConfirm}
                    onSmileGalleryDialogToggle={this.toggleModalOpen}
                    cloudinaryImageList={this.props.cloudinaryImageList}
                    services={this.state.allServicesList}
                    featuredServices={this.props.featuredServices}
                    onFeaturedServicesChange={this.handleFeaturedServicesChange}
                    onExteriorOfficePhotoImageChange={this.handleExteriorOfficePhotoImageChange}
                    exteriorOfficePhotoFile={this.state.exteriorOfficePhotoFile}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;

    return {
        customizeHome: getItemsByPortalId(state.customizeHome, portalId),
        homeWidgets: getItemsByPortalId(state.homeWidgets, portalId),
        cloudinaryImageList: getItemsByPortalId(state.cloudinaryImageList, portalId),
        services: getItemsByPortalId(state.services, portalId),
        featuredServices: getItemsByPortalId(state.featuredServices, portalId)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadCustomizeHome,
        updateCustomizeHome,
        //loadHomeWidgets,
        loadFeaturedServices,
        updateFeaturedServices,
        updateHomeWidgets,
        cloudinaryUploadSingleImage,
        cloudinaryLoadImages
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(CustomizeHomeContainer));