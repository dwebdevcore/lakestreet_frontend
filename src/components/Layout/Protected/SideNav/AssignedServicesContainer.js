import React from 'react';
import PropTypes from 'prop-types';
import {getItemsByPortalId} from "../../../../selectors";
import {bindActionCreators} from "redux";
import {loadServices} from "../../../../redux/actions/actionCreators";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import NavSection from "./NavSection";
import {servicesToRoute} from '../../../../helpers/format';


class AssignedServicesContainer extends React.Component {
    static propTypes = {
        services: PropTypes.array
    };


    componentDidMount() {
        let portalId = this.props.match.params.id;
        if (portalId && !this.props.services) {
            this.props.loadServices(portalId);
        }
    }

    componentWillReceiveProps(nextProps) {

        let {services} = nextProps;
        if (!services) {
            this.props.loadServices(nextProps.match.params.id);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.services &&
                <NavSection
                    icon='heartbeat'
                    routes={this.props.services}
                    sectionName='Assigned Services'/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    let portalId = routerProps.match.params.id;
    let services = getItemsByPortalId(state.services, portalId);
    if (services) {
        services = servicesToRoute(services, portalId);
    }
    return {
        services: services
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadServices,
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssignedServicesContainer));