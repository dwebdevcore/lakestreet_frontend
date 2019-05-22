import React from 'react';
import {getOffices} from '../helpers/recentOffices';
import {Home} from "../components/Home";
import {withAuth} from '../components/Auth';

class HomeContainer extends React.Component {
    static propTypes = {};
    state = {
        recentOffices: []
    };

    componentDidMount() {
        this.setState({recentOffices: getOffices()});
    }

    render() {
        return <React.Fragment>
            {this.state.recentOffices && <Home offices={this.state.recentOffices}/>}
        </React.Fragment>
    }
}


export default withAuth(HomeContainer);