import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProgressBar from './ProgressBar'

class ProgressBarContainer extends Component {
    static propTypes = {
        ajaxCallsInProgress: PropTypes.number,

    };

    render() {
        return (
            <React.Fragment>
                {this.props.ajaxCallsInProgress > 0 ? <ProgressBar/> : null}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {

        ajaxCallsInProgress: state.ajaxCallsInProgress
    };
};

export default connect(mapStateToProps, null)(ProgressBarContainer);


