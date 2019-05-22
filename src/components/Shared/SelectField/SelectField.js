import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {classNames} from "../../../helpers/format";

const offsetLeft = 10;
const offsetLeftWithIcon = 45;
const inputHeight = 40;
const styles = theme => ({
    textField: {
        position: 'relative',
        backgroundColor: theme.color.grey.light,
        marginBottom: 40,
        boxSizing: 'border-box',
        height: inputHeight,
        '& input': {
            height: inputHeight,
            padding: `0 0 0 ${offsetLeft}px`
        },
    },
    label: {
        top: -13,
        marginLeft: offsetLeft,
        fontSize: 15
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 11,
        zIndex: 100,
        color: theme.color.grey.dark
    },
    formControl: {
        marginTop: '0 !important'
    },
    selectFormControl: {
        marginTop: '0 !important',
        top: -15,
        height: inputHeight,
        '& svg': {
            top: 6
        }
    },
    select: {
        height: inputHeight,
        lineHeight: 1.9,
        paddingLeft: offsetLeft,
        boxSizing: 'border-box'
    },
    withIcon: {
        '& label': {
            marginLeft: offsetLeftWithIcon,
        },
        '& input': {
            paddingLeft: offsetLeftWithIcon
        }
    }
});

const SelectField = ({classes, value, name, label, icon, onChange, fullWidth, className, selectOptions,}) => {
    let textFieldClasses = [classes.textField];
    let textFieldProps = {};
    if (fullWidth) {
        textFieldProps.fullWidth = true;
    }
    if (className) {
        textFieldClasses.push(className);
    }
    if (icon) {
        textFieldClasses.push(classes.withIcon);
    }

    return (
        <FormControl className={classNames(textFieldClasses)} {...textFieldProps}>
            {icon && <FontAwesomeIcon icon={icon} className={classes.icon}/>}
            <InputLabel className={classes.label}>
                {label}
            </InputLabel>
            <Select
                value={value}
                onChange={onChange}
                classes={{
                    root: classes.selectFormControl,
                    select: classes.select
                }}
                inputProps={{
                    name: name,
                    classes: {
                        root: classes.formControl
                    }
                }}>

                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    selectOptions.map(({option, label}, index) => {
                        return <MenuItem value={option} key={name + option + value + index}>{label}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
};
SelectField.propTypes = {
    type: PropTypes.string,
    select: PropTypes.bool,
    selectOptions: PropTypes.array,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};
export default withStyles(styles)(SelectField);

