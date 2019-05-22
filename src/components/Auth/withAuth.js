import React from 'react';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom';
import ProtectedLayout from '../Layout/Protected/ProtectedLayout';
import {getItemsByPortalId} from "../../selectors/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadOfficeData} from "../../redux/actions/actionCreators";
import {open, ProtectedLayoutContext} from "../Layout/Protected/ProtectedLayoutContext";
import ProgressBarContainer from "../Layout/Protected/ProgressBar/ProgressBarContainer";
import routes from "../../config/routes";

export default function withAuth(AuthComponent) {
    class AuthWrapped extends React.Component {
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

        componentWillMount() {
            if (!this.props.authUser) {
                this.props.history.push(routes.LOGIN.path);
            }
        }

        render() {
            if (this.props.authUser) {
                return (
                    <ProtectedLayoutContext.Provider value={this.state}>
                        <ProgressBarContainer/>
                        <ProtectedLayout>
                            <AuthComponent {...this.props}/>
                        </ProtectedLayout>
                    </ProtectedLayoutContext.Provider>
                )
            }
            return null;
        }
    };
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
        };
    };
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWrapped));
}