import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {AboutYourTeam} from '../components/AboutYourTeam';
import {AddMemberButton} from '../components/AboutYourTeam';
import {bindActionCreators} from "redux";
import {
    loadDentalTeamWithBio,
    loadDentalTeamBio,
    deleteDentalTeamMember,
    addDentalTeamMember,
    updateDentalTeamMemberBio,
    cloudinaryUploadImages
} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import {ConfirmDialog} from "../components/Shared/ConfirmDialog";
import {getItemsByPortalId} from '../selectors/index';
import AddTeamMemeber from "../components/AboutYourTeam/AddTeamMember";
import {withAuth} from '../components/Auth';

class AboutYourTeamContainer extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        loadDentalTeamWithBio: PropTypes.func.isRequired,
        loadDentalTeamBio: PropTypes.func.isRequired,
        deleteDentalTeamMember: PropTypes.func.isRequired,
        updateDentalTeamMemberBio: PropTypes.func.isRequired,
    };
    state = {
        updatedBios: [], //needed to prevent waste PUT request on a common Save Draft
        updatedImages: [],
        modalOpen: false,
        itemToDelete: null,
        dentalTeam: [],
        dentalTeamBios: [],
        addedMember: null
    };

    componentDidMount() {
        this.initValues(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initValues(nextProps);
    }

    initValues(props) {

        let {dentalTeam, dentalTeamBios} = props;
        let portalId = props.match.params.id;

        if (portalId && !dentalTeam) {
            this.props.loadDentalTeamWithBio(portalId);
        }
        if (dentalTeam && (dentalTeam !== this.state.dentalTeam)) {
            this.setState({dentalTeam: dentalTeam});
        }
        if (dentalTeamBios && (dentalTeamBios !== this.state.dentalTeamBios)) {
            this.setState({dentalTeamBios: dentalTeamBios});
        }
    }

    handleTextChange = (item, property, value) => {

        let {dentalTeamBios} = this.state;
        //TODO: This will be moved to redux

        //TODO: move this to a DoctorContainer? Since we have a common Save Draft button
        //We should handle by this container

        this.setState({
            dentalTeamBios: dentalTeamBios.map((bio) => {
                if (bio.team_member_id === item.team_member_id) {
                    return Object.assign({}, bio, {
                        [property]: value
                    });
                }
                return bio;
            })
        });

        if (this.state.updatedBios.indexOf(item.team_member_id) === -1) {
            this.setState((state) => {
                return {updatedBios: [...state.updatedBios, item.team_member_id]};
            });
        }
    };
    handleAddMember = () => {
        this.setState({
            addedMember: this.state.addedMember ? null :
                {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    bio: '',
                    image: ''
                }
        });
    };
    handleAddTeamMemberTextChange = (e) => {
        let {addedMember} = this.state;
        addedMember[e.target.name] = e.target.value;
        this.setState({addedMember: addedMember});
    };
    handleRichTextChange = (name, value) => {
        let {addedMember} = this.state;
        addedMember[name] = value;
        this.setState({addedMember: addedMember});
    };
    handleAddTeamMemberImageChange = (item) => {
        let {addedMember} = this.state;
        addedMember.image = item;
        this.setState({addedMember: addedMember});
    };
    handleRemoveMember = () => {
        let portal_id = this.props.match.params.id;
        let item = this.state.itemToDelete;
        this.props.deleteDentalTeamMember({portal_id, item});
        this.toggleModalOpen(null);
    };
    toggleModalOpen = (item) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            itemToDelete: item
        });
    };
    handleSaveDraft = () => {
        let {updatedBios, dentalTeamBios, updatedImages} = this.state;
        let portalId = this.props.match.params.id;
        if (updatedBios.length) {
            let items = dentalTeamBios
                .filter((item) => updatedBios.indexOf(item.team_member_id) > -1);

            this.props.updateDentalTeamMemberBio({
                portal_id: portalId,
                items
            });

            this.setState({updatedBios: []});
        }

        if (updatedImages.length) {
            this.props.cloudinaryUploadImages({
                portal_id: portalId,
                items: updatedImages,
                isDoctorPhoto: false
            });

            this.setState({updatedImages: []});
        }

        if (this.state.addedMember) {
            //call post api
            this.props.addDentalTeamMember({
                portal_id: portalId,
                item: {
                    first_name: this.state.addedMember.firstName,
                    middle_name: this.state.addedMember.middleName,
                    last_name: this.state.addedMember.lastName
                },
                bio: this.state.addedMember.bio,
                image: this.state.addedMember.image,
            });
            this.setState({addedMember: null});
        }
    };
    handleImageChange = (item) => {
        let imageExist = this.state.updatedImages
            .filter(image => image.team_member_id === item.team_member_id)[0] || null;

        item.portal_id = this.props.match.params.id;

        if (!imageExist) {
            let {updatedImages} = this.state;
            updatedImages = [...updatedImages, item];
            this.setState({updatedImages: updatedImages});
        }
    };

    render() {

        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='About Your Team'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                <AddMemberButton
                    onAddMember={this.handleAddMember}
                    added={this.state.addedMember}
                />
                {this.state.addedMember && <AddTeamMemeber
                    addedMember={this.state.addedMember}
                    onImageChange={this.handleAddTeamMemberImageChange}
                    onTextChange={this.handleAddTeamMemberTextChange}
                    onRichTextChange={this.handleRichTextChange}
                />}
                <AboutYourTeam
                    onImageChange={this.handleImageChange}
                    portalId={this.props.match.params.id}
                    doctors={this.state.dentalTeam}
                    doctorBios={this.state.dentalTeamBios}
                    onTextChange={this.handleTextChange}
                    onModalOpen={this.toggleModalOpen}
                />
                <AddMemberButton onAddMember={this.handleAddMember}/>
                <ConfirmDialog
                    title="Are you sure want to remove a member?"
                    open={this.state.modalOpen}
                    onClose={this.toggleModalOpen}
                    onConfirm={this.handleRemoveMember}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;
    return {
        dentalTeam: getItemsByPortalId(state.dentalTeam, portalId),
        dentalTeamBios: getItemsByPortalId(state.dentalTeamBio, portalId),
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadDentalTeamWithBio,
        loadDentalTeamBio,
        deleteDentalTeamMember,
        updateDentalTeamMemberBio,
        addDentalTeamMember,
        cloudinaryUploadImages
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(AboutYourTeamContainer));
