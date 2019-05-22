import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom'
import routes from '../../../config/routes';
import {searchOffice} from "../../../redux/actions/actionCreators";
import {setOffice} from '../../../helpers/recentOffices';
class SearchContainer extends React.Component {
    static propTypes = {
        searchOfficeList: PropTypes.array.isRequired,
        history: PropTypes.object
    };
    state = {
        searchQuery: '',
        searchDropDownOpen: false,
    };
    toggleDropdown = () => {
        this.setState({searchDropDownOpen: !this.state.searchDropDownOpen});
    };
    handleTextChange = (e) => {
        let {value} = e.target;
        this.setState({searchQuery: value});
        if (value) {
            this.props.searchOffice({query: value});
        }

        /*
        * Could be just: this.setState({searchDropDownOpen: !!this.props.searchOffice});
        * But to set only once and prevent waste re-render using next:
        * */
        if (this.props.searchOfficeList) {
            this.setState((state, props) => {
                if (!state.searchDropDownOpen)
                    return {searchDropDownOpen: true};
            });
        } else {
            this.setState({searchDropDownOpen: false});
        }
    };
    handleSearchItemClick = (item) => {
        this.props.history.push(`${routes.SITE_META.path}/${item.portal_id}`);
        setOffice(item);
    };

    render() {
        return <Search
            items={this.props.searchOfficeList}
            searchQuery={this.state.searchQuery}
            onTextChange={this.handleTextChange}
            searchDropDownOpen={this.state.searchDropDownOpen}
            toggleDropdown={this.toggleDropdown}
            onOfficeSelect={this.handleSearchItemClick}
        />;
    }
}

const mapStateToProps = state => {
    return {
        searchOfficeList: state.searchOfficeList
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        searchOffice
    }, dispatch);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchContainer));