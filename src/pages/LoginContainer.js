import React from 'react';
import {Login} from '../components/Login';
import {bindActionCreators} from "redux";
import {logIn} from "../redux/actions/actionCreators";
import {connect} from "react-redux";
import routes from '../config/routes';
class LoginContainer extends React.Component {
    static propTypes = {};
    state = {
        u: '',
        p: ''
    };

    componentDidMount() {
        this.authRedirect(this.props.authUser);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.authRedirect(nextProps.authUser);
    }

    authRedirect = (loggedInUser) => {
        if (loggedInUser) {
            this.props.history.push(routes.HOME_PAGE.path);
        }
    };
    handleTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.logIn(this.state);
    };
    handleFormClear = () => {
        this.setState({u: '', p: ''});
    };

    render() {
        return (
            <Login
                credentials={this.state}
                onChange={this.handleTextChange}
                onClear={this.handleFormClear}
                onSubmit={this.handleFormSubmit}/>
        );
    }
}

const mapStateToProps = (state, routerProps) => {

    return {
        authUser: state.authUser,

    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logIn,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);