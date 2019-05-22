import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {DoctorAssignment} from '../components/DoctorAssignment';
import {arrayMove} from 'react-sortable-hoc';
import {bindActionCreators} from "redux";
import {
    searchDoctor,
    loadDoctors,
    deleteDoctors,
    addDoctors,
    arrangeDoctors
} from "../redux/actions/actionCreators";

import {connect} from "react-redux";
import {getItemsByPortalId} from "../selectors";
import {withAuth} from '../components/Auth';
class DoctorAssignmentContainer extends React.Component {
    static propTypes = {
        searchDoctorList: PropTypes.array,
        doctors: PropTypes.array,
        searchDoctor: PropTypes.func,
        loadDoctors: PropTypes.func,
        deleteDoctors: PropTypes.func,
    };
    state = {
        searchQuery: '',
        searchDropDownOpen: false,
        doctors: [],
        toAssign: [],
        toDelete: [],
        orderChanged: false
    };

    componentDidMount() {
        let portalId = this.props.match.params.id;
        if (portalId && !this.props.doctors) {
            this.props.loadDoctors({portal_id: portalId});
        } else {
            this.setState({doctors: this.props.doctors});
        }

    }

    componentWillReceiveProps(nextProps) {
        let {doctors} = nextProps;
        if (doctors && (doctors !== this.state.doctors)) {
            this.setState({doctors: doctors});
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            doctors: arrayMove(this.state.doctors, oldIndex, newIndex),
            orderChanged: true
        });
    };
    toggleDropdown = () => {
        this.setState({searchDropDownOpen: !this.state.searchDropDownOpen});
    };
    handleTextChange = (e) => {
        let {value} = e.target;
        this.setState({searchQuery: value});
        if (value) {
            this.props.searchDoctor({query: value});
        }

        /*
        * Could be just: this.setState({searchDropDownOpen: !!this.props.searchOffice});
        * But to set only once and prevent waste re-render using next:
        * */
        if (this.props.searchDoctorList) {
            this.setState((state, props) => {
                if (!state.searchDropDownOpen)
                    return {searchDropDownOpen: true};
            });
        } else {
            this.setState({searchDropDownOpen: false});
        }
    };

    handleAddDoctor = (doctor) => {
        this.setState((state) => {
            if (!state.doctors.filter(assigned => assigned.npi === doctor.npi)[0]) {
                return {
                    doctors: [...state.doctors, doctor],
                    toAssign: [...state.toAssign, doctor]
                };
            }
        });
    };
    handleRemoveDoctor = (doctor) => {
        this.setState((state) => {
            return {
                doctors: [...state.doctors.filter(assigned => {
                    return assigned.npi !== doctor.npi;
                })],
                toDelete: [...state.toDelete, doctor]
            };
        });
    };
    handleSaveDraft = () => {
        let portalId = this.props.match.params.id;
        if (portalId) {
            if (this.state.toAssign.length) {
                this.props.addDoctors({
                    portal_id: portalId,
                    doctorsToAssign: this.state.toAssign,
                    doctors: this.state.doctors
                });
            }
            if (this.state.toDelete.length) {
                //post api call
                this.props.deleteDoctors({
                    portal_id: portalId,
                    doctorsToDelete: this.state.toDelete,
                    doctors: this.state.doctors
                });
            }
            if (this.state.orderChanged) {
                //post api call
                this.props.arrangeDoctors({
                    portal_id: portalId,
                    arrangedNpiList: this.state.doctors.map(d => d.npi),
                    doctors: this.state.doctors
                });
            }
        }


    };

    render() {

        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Doctor Assignment'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                <DoctorAssignment
                    toggleDropdown={this.toggleDropdown}
                    searchDropDownOpen={this.state.searchDropDownOpen}
                    onSortEnd={this.onSortEnd}
                    doctorAssignmentSearch={this.state.searchQuery}
                    doctorList={this.props.searchDoctorList}
                    doctors={this.state.doctors}
                    onTextChange={this.handleTextChange}
                    addDoctor={this.handleAddDoctor}
                    removeDoctor={this.handleRemoveDoctor}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {
    let portalId = routerProps.match.params.id;
    return {
        searchDoctorList: state.searchDoctorList,
        doctors: getItemsByPortalId(state.doctors, portalId),
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        searchDoctor,
        loadDoctors,
        deleteDoctors,
        addDoctors,
        arrangeDoctors
    }, dispatch);
};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(DoctorAssignmentContainer));