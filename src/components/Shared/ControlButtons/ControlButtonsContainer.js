import React from 'react';
import PropTypes from 'prop-types';
import ControlButtons from "./ControlButtons";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getItemsByPortalId} from "../../../selectors";
import {endPoints} from '../../../config/api';
import {bindActionCreators} from "redux";
import {publishOffice} from "../../../redux/actions/actionCreators";

class ControlButtonsContainer extends React.Component {
    static propTypes = {
        office: PropTypes.object,
        title: PropTypes.string,
        onSaveDraft: PropTypes.func,
        onPreview: PropTypes.func,
    };
    state = {
        loading: false,
    };

    componentWillReceiveProps(nextProps) {
        let {office} = nextProps;
        if(this.state.loading && !nextProps.loading){
            this.setState({loading: false});
            window.location.href = `${endPoints.PREVIEW(office.content_url, office.tld)}`;
        }
    }

    handlePreviewClick = () => {
        let {office} = this.props;

        if (!this.props.loading) {
            this.setState({loading: true});
            this.props.publishOffice(office.portal_id);
        }
    };

    render() {
        return (
            <ControlButtons
                {...this.props}
                onPreview={this.handlePreviewClick}
                />
        );
    }
}

const mapStateToProps = (state, routerProps) => {
    let portalId = parseInt(routerProps.match.params.id, 10);
    return {
        office: getItemsByPortalId(state.officeList, portalId),
        loading: state.publishOfficeLoading
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        publishOffice
    }, dispatch);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlButtonsContainer));