import React from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const styles = (theme) => ({
    search: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'auto',
            minWidth: theme.centralBlockMaxWidth,
        },
        boxSizing: 'border-box',
        backgroundColor: theme.color.grey.light,
        padding: theme.spacing.unit / 2,
        borderRadius: theme.shape.borderRadius
    },
    icon: {
        color: theme.color.grey.main,
        cursor: 'pointer',
    },
    iconLarge: {
        fontSize: 20
    },
    adornment: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

const SearchTextField = ({classes, value, name, onChange, onBlur, onFocus, placeholder}) => {
    let inputProps = {
        disableUnderline: true,
        startAdornment: <InputAdornment position="start" className={classes.adornment}>
            <FontAwesomeIcon icon="search" className={classes.icon}/>
        </InputAdornment>,
    };

    return (
        <TextField
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className={classes.search}
            InputProps={inputProps}
        />
    )
};

SearchTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};
export default withStyles(styles)(SearchTextField);