import React from 'react';
import Header from "./Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {logOut} from "../../../../redux/actions/actionCreators";
import {withRouter} from "react-router-dom";
import routes from '../../../../config/routes';

class HeaderContainer extends React.Component {
    static propTypes = {};

    logOut = () => {
        localStorage.removeItem('authUser');
        this.props.logOut();
        this.props.history.push(routes.LOGIN.path);
    };

    render() {
        return (
            <Header
                onLogOut={this.logOut}
                authUser={this.props.authUser}
                showSearch={!!this.props.match.params.id}
            />
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    return {
        authUser: state.authUser
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logOut,
    }, dispatch);
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));