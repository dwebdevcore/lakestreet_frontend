import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const styles = theme => ({
    icon: {
        cursor: 'pointer',
        alignItems: 'center',
        color: theme.color.grey.main
    }
});

class Menu extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        onLogOut: PropTypes.func.isRequired
    };
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <FontAwesomeIcon icon="caret-down" className={classes.icon} onClick={this.handleClick}/>
                <MaterialMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.props.onLogOut}>Logout</MenuItem>
                </MaterialMenu>
            </div>
        );
    }
}

export default withStyles(styles)(Menu);