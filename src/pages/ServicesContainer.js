import React from 'react';
import PropTypes from 'prop-types';
import {ControlButtonsContainer} from '../components/Shared/ControlButtons';
import {Services} from '../components/Services';
import {getItemsByPortalId} from "../selectors/index";
import {bindActionCreators} from "redux";
import {loadServices, updateServices, deleteServices} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import {withAuth} from '../components/Auth';

class ServicesContainer extends React.Component {
    static propTypes = {
        services: PropTypes.array
    };
    state = {
        services: [],
        servicesToUpdate: [],
        servicesToDelete: []
    };

    componentDidMount() {
        if (this.props.services) {
            this.setState({services: this.props.services});
        }
    }

    componentWillReceiveProps(nextProps) {
        let {services} = nextProps;
        if (services && (services !== this.state.services)) {
            this.setState({services: services});
        }
    }


    /*
    * This method handles 2 arrays of ID's for update/delete taxomomy_id
    *
    * */
    handleServiceChange = (e, id) => {

        let arrayToPush = e.target.checked ? this.state.servicesToUpdate : this.state.servicesToDelete;
        let arrayToDelete = e.target.checked ? this.state.servicesToDelete : this.state.servicesToUpdate;
        if (arrayToPush.indexOf(id) === -1) {
            arrayToPush.push(id);

            let index = arrayToDelete.indexOf(id);
            if (index !== -1) arrayToDelete.splice(index, 1);
        }

        this.setState({
            servicesToUpdate: e.target.checked ? arrayToPush : arrayToDelete,
            servicesToDelete: e.target.checked ? arrayToDelete : arrayToPush
        });
    };
    handleCheckBoxChange = (e, parentId) => {
        let {services} = this.state;

        let id = +e.target.name.split('_').pop();
        let checked = e.target.checked;
        this.handleServiceChange(e, id);

        if (!parentId) {
            this.setState({
                services: services.map(service => {
                    if (service.taxonomy_id === id) {
                        let newService = Object.assign({}, service, {
                            enabled: checked
                        });
                        if (!checked) {
                            newService.children = service.children.map(child => {
                                return Object.assign({}, child, {
                                    enabled: false
                                });
                            })
                        }
                        return newService;
                    }
                    return service;
                })
            });
        } else {
            this.setState({
                services: services.map(service => {
                    if (service.taxonomy_id === parentId) {
                        return Object.assign({}, service, {
                            children: service.children.map(child => {
                                if (child.taxonomy_id === id) {
                                    return Object.assign({}, child, {
                                        enabled: e.target.checked
                                    });
                                }
                                return child;
                            })
                        });
                    }
                    return service;
                })
            });
        }
    };
    handleSaveDraft = () => {
        let {servicesToUpdate, servicesToDelete} = this.state;
        let portal_id = this.props.match.params.id;
        if (servicesToUpdate.length && portal_id) {
            this.props.updateServices({
                portal_id: portal_id,
                taxonomy_ids: {
                    taxonomy_ids: servicesToUpdate
                },
                //Needed for updating redux state with changed data
                services: this.state.services
            });
            this.setState({servicesToUpdate: []});
        }
        if (servicesToDelete.length && portal_id) {
            this.props.deleteServices({
                portal_id: portal_id,
                servicesToDelete: servicesToDelete,
                services: this.state.services
            });
            this.setState({servicesToDelete: []});
        }
    };

    render() {
        return (
            <React.Fragment>
                <ControlButtonsContainer
                    title='Services'
                    onSaveDraft={this.handleSaveDraft}
                    onPreview={this.handlePreview}
                    onPublish={this.handlePublish}
                />
                {this.state.services &&
                <Services services={this.state.services} onChange={this.handleCheckBoxChange}/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;

    return {
        services: getItemsByPortalId(state.services, portalId),
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadServices,
        updateServices,
        deleteServices
    }, dispatch);
};

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(ServicesContainer));