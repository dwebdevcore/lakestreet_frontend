import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadOfficeData} from "../../../redux/actions/actionCreators";
import {ProtectedLayoutContext, open} from "./ProtectedLayoutContext";
import ProtectedLayout from "./ProtectedLayout";
import {getItemsByPortalId} from "../../../selectors/index";
import {ProgressBarContainer} from './ProgressBar';


class ProtectedLayoutContainer extends Component {
    static propTypes = {
        children: PropTypes.any,
        currentOfficeData: PropTypes.object,
        authUser: PropTypes.object,
        open: PropTypes.bool,
    };
    toggleSideNav = () => this.setState({open: !this.state.open});
    state = {
        currentOfficeData: null,
        authUser: null,
        open: open,
        toggleSideNav: this.toggleSideNav,
    };

    componentDidMount() {
        let {id} = this.props.match.params;
        if (!this.state.currentOfficeData && id) {
            this.props.loadOfficeData(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        let {id} = nextProps.match.params;
        let {currentOfficeData} = nextProps;

        if (this.state.authUser !== nextProps.authUser) {
            this.setState({authUser: nextProps.authUser});
        }

        if (currentOfficeData && (currentOfficeData !== this.state.currentOfficeData)) {
            this.setState({currentOfficeData: currentOfficeData});
        }

        if (id) {
            if (!currentOfficeData && !this.state.currentOfficeData) {
                this.props.loadOfficeData(id);
            }

            if (!nextProps.currentOfficeData && this.state.currentOfficeData) {
                this.props.loadOfficeData(id);
            }
        }


    }

    render() {
        return (
            <ProtectedLayoutContext.Provider value={this.state}>
                <ProgressBarContainer/>
                <ProtectedLayout {...this.props} />
            </ProtectedLayoutContext.Provider>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadOfficeData,
    }, dispatch);
};
const mapStateToProps = (state, router) => {

    let portalId = parseInt(router.match.params.id, 10);
    return {
        currentOfficeData: getItemsByPortalId(state.officeList, portalId),
        authUser: state.authUser,
        // ajaxCallsInProgress: state.ajaxCallsInProgress
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedLayoutContainer);

