import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {DoctorsChair} from '../components/DoctorsChair';
import {getItemsByTaxonomylId} from "../selectors";
import {bindActionCreators} from "redux";
import {loadDentistChair, updateDentistChairDoctors} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import {withAuth} from '../components/Auth';
class DoctorsChairContainer extends React.Component {
    static propTypes = {
        dentistChair: PropTypes.array,
        dentistChairDoctors: PropTypes.object
    };
    state = {
        dentistChair: [],
        dentistChairDoctors: null,
        textToUpdate: {}
    };

    componentDidMount() {
        let portalId = this.props.match.params.id;
        let taxonomyId = this.props.match.params.taxonomyId;

        if (portalId && !this.props.dentistChair && !this.props.dentistChairDoctors) {
            this.props.loadDentistChair({
                portal_id: portalId,
                taxonomy_id: taxonomyId
            });
        } else {
            this.setState({
                dentistChair: this.props.dentistChair,
                dentistChairDoctors: this.props.dentistChairDoctors
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        let {dentistChair, dentistChairDoctors} = nextProps;
        if (dentistChair && (dentistChair !== this.state.dentistChair)) {
            this.setState({dentistChair: dentistChair});
        }
        if (dentistChairDoctors && (dentistChairDoctors !== this.state.dentistChairDoctors)) {
            this.setState({dentistChairDoctors: dentistChairDoctors});
        }

        if (!nextProps.dentistChair && !nextProps.dentistChairDoctors) {
            let portalId = nextProps.match.params.id;
            let taxonomyId = nextProps.match.params.taxonomyId;
            this.props.loadDentistChair({
                portal_id: portalId,
                taxonomy_id: taxonomyId
            });
        }

    }

    handleSaveDraft = () => {
        console.log('handle save draft');
        let {dentistChairDoctors, textToUpdate} = this.state;
        if (Object.keys(textToUpdate).length > 0) {
            this.props.updateDentistChairDoctors({
                portal_id: this.props.match.params.id,
                taxonomy_id: this.props.match.params.taxonomyId,
                textToUpdate: Object.keys(textToUpdate).map((item) => textToUpdate[item]),
                dentistChairDoctors: dentistChairDoctors
            });
        }
    };
    handlePreview = () => {
        console.log('handle preview');
    };
    handlePublish = () => {
        console.log('handle publish');
    };
    handlePropChange = (comment, value) => {
        let {dentistChairDoctors, textToUpdate} = this.state;
        let newObject = Object.assign({}, dentistChairDoctors, {
            [comment.npi]: Object.assign({}, dentistChairDoctors[comment.npi], {
                dentist_chair_items:
                    Object.assign({}, dentistChairDoctors[comment.npi].dentist_chair_items, {
                        [comment.taxonomy_id]: {
                            text: value
                        }
                    })
            })
        });

        textToUpdate[comment.npi] = {
            taxonomy_id: comment.taxonomy_id,
            npi: comment.npi,
            text: value
        };

        this.setState({
            dentistChairDoctors: newObject,
            textToUpdate: textToUpdate
        });
    };
    handleToggleChange = (comment) => {
        let {dentistChair} = this.state;
        this.setState({
            dentistChair: dentistChair.map(chair => {
                if (chair.taxonomy_id === comment.taxonomy_id) {
                    chair.enabled = !chair.enabled;
                }
                return {...chair};
            })
        });
    };
    handleSelectChange = (comment, value) => {
        let {dentistChair} = this.state;
        this.setState({
            dentistChair: dentistChair.map(chair => {
                if (chair.taxonomy_id === comment.taxonomy_id) {
                    chair.npi = value;
                }
                return {...chair};
            })
        });
    };
    render() {

        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Cosmetic Dentistry'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                {(this.state.dentistChair && this.state.dentistChairDoctors) &&
                <DoctorsChair
                    dentistChair={this.state.dentistChair}
                    dentistChairDoctors={this.state.dentistChairDoctors}
                    comments={this.state.comments}
                    onChange={this.handlePropChange}
                    onSelect={this.handleSelectChange}
                    onToggle={this.handleToggleChange}/>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {
    let taxonomyId = routerProps.match.params.taxonomyId;
    return {
        dentistChair: getItemsByTaxonomylId(state.dentistChair, taxonomyId),
        dentistChairDoctors: getItemsByTaxonomylId(state.dentistChairDoctors, taxonomyId),
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadDentistChair,
        updateDentistChairDoctors
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(DoctorsChairContainer));
