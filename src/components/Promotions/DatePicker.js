import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import {InlineDatePicker} from 'material-ui-pickers/DatePicker';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    adornment: {
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        '& svg': {
            color: theme.color.grey.main
        }
    },
    datepicker: {
        backgroundColor: theme.color.grey.light,
        marginBottom: theme.spacing.unit * 5,
        '& label': {
            marginLeft: theme.spacing.unit,
        }
    },

});
const DatePicker = ({classes, date, label, onDateChange}) => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <InlineDatePicker
                fullWidth
                className={classes.datepicker}
                format="dd/MM/yyyy"
                label={label}
                value={date}
                onChange={onDateChange}
                leftArrowIcon={<FontAwesomeIcon icon="chevron-left"/>}
                rightArrowIcon={<FontAwesomeIcon icon="chevron-right"/>}
                adornmentPosition='start'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" className={classes.adornment}>
                            <FontAwesomeIcon icon="calendar-alt"/>
                        </InputAdornment>
                    ),
                }}
            />
        </MuiPickersUtilsProvider>

    )
};


DatePicker.propTypes = {
    /*date: PropTypes.instanceOf(Date),*/
    date: PropTypes.any,
    label: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePicker);
