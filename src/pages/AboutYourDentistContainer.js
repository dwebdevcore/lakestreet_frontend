import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {AboutYourDentist} from '../components/AboutYourDentist';

import {bindActionCreators} from "redux";
import {
    loadDoctors,
    updateDoctorBio,
    cloudinaryUploadImages
} from "../redux/actions/actionCreators";

import {connect} from "react-redux";
import {getItemsByPortalId} from '../selectors/index';
import {withAuth} from '../components/Auth';
class AboutYourDentistContainer extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        loadDoctors: PropTypes.func.isRequired,
        updateDoctorBio: PropTypes.func.isRequired,
    };
    state = {
        updatedBios: [], //needed to prevent waste PUT request on a common Save Draft
        updatedImages: [],
        modalOpen: false,
        itemToDelete: null,
        doctors: [],
        doctorBios: [],
    };

    componentDidMount() {
        this.initValues(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initValues(nextProps);
    }

    initValues(props) {
        let {doctors, doctorBios} = props;
        let portalId = props.match.params.id;
        if (portalId && !doctors) {
            this.props.loadDoctors({portal_id: portalId});
        }
        if (doctors && (doctors !== this.state.doctors)) {
            this.setState({doctors: doctors});
        }

        if (doctorBios && (doctorBios !== this.state.doctorBios)) {
            this.setState({doctorBios: doctorBios});
        }
    }

    handleTextChange = (item, property, value) => {

        let {doctorBios} = this.state;

        //TODO: move this to a DoctorContainer? Since we have a common Save Draft button
        //We should handle by this container

        this.setState({
            doctorBios: doctorBios.map((bio) => {
                if (bio.npi === item.npi) {
                    return Object.assign({}, bio, {
                        [property]: value
                    });
                }
                return bio;
            })
        });

        if (this.state.updatedBios.indexOf(item.npi) === -1) {
            this.setState((state) => {
                return {updatedBios: [...state.updatedBios, item.npi]};
            });
        }
    };

    handleAddMember = () => {
        console.log('handle add member')
    };


    handleSaveDraft = () => {
        let {updatedBios, doctorBios, updatedImages} = this.state;
        if (updatedBios.length) {
            let bios = doctorBios
                .filter((item) => updatedBios.indexOf(item.npi) > -1);

            this.props.updateDoctorBio({
                portal_id: this.props.match.params.id,
                bios
            });

            this.setState({updatedBios: []});
        }

        if (updatedImages.length) {
            this.props.cloudinaryUploadImages({
                portal_id: this.props.match.params.id,
                items: updatedImages,
                isDoctorPhoto: true
            });

            this.setState({updatedImages: []});
        }
    };
    handleImageChange = (item) => {
        let imageExist = this.state.updatedImages
            .filter(image => image.npi === item.npi)[0] || null;

        item.portal_id = this.props.match.params.id;

        if (!imageExist) {
            this.setState((state) => {
                return {updatedImages: [...state.updatedImages, item]};
            });
        }
        console.log(this.state.updatedImages)
    };

    render() {
        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='About Your Dentist'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                <AboutYourDentist
                    onImageChange={this.handleImageChange}
                    doctors={this.state.doctors}
                    doctorBios={this.state.doctorBios}
                    onTextChange={this.handleTextChange}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;
    return {
        doctors: getItemsByPortalId(state.doctors, portalId),
        doctorBios: getItemsByPortalId(state.doctorBio, portalId),

    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadDoctors,
        updateDoctorBio,
        cloudinaryUploadImages
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(AboutYourDentistContainer));
