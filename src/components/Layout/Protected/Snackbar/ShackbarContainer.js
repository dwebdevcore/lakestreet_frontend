import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import {showSnackbar} from '../../../../redux/actions/actionCreators';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class ShackbarContainer extends React.Component {

    static propTypes = {
        snackbar: PropTypes.object
    };
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        // Return null to indicate no change to state.
        return null;
    }

    handleClose = () => {
        this.props.showSnackbar('', '');
    };

    render() {
        let {classes} = this.props;
        return <React.Fragment>
            {this.props.snackbar.message &&
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.props.snackbar.message !== ''}
                onClose={this.handleClose}
                autoHideDuration={2000}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: {
                        root: classes[this.props.snackbar.variant]
                    }
                }}
                message={<span id="message-id">{this.props.snackbar.message}</span>}
            />}
        </React.Fragment>;

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        snackbar: state.snackbar
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        showSnackbar
    }, dispatch);
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ShackbarContainer));
