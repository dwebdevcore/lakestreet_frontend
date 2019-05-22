import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '../Shared/TextField';
import {SelectField} from '../Shared/SelectField';
import TextArea from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from './DatePicker';
import Duration from './Duration';
import FormButtons from './FormButtons';
import {epochToDate} from '../../helpers/format';

const styles = theme => ({
    form: {
        width: '100%',
        maxWidth: theme.centralBlockMaxWidth,
        paddingBottom: theme.spacing.unit * 7,
        borderBottom: `2px solid ${theme.color.grey.light}`
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    inputWithCheckbox: {
        position: 'relative'
    },
    label: {
        position: 'absolute',
        right: 20,
        bottom: 35
    },
    textarea: {
        backgroundColor: theme.color.grey.light,
        marginBottom: theme.spacing.unit * 5,
        '& label': {
            marginLeft: theme.spacing.unit
        },
        '& textarea': {
            padding: theme.spacing.unit
        }
    },
    button: {
        textTransform: 'lowercase',
    }
});
const PromotionForm = ({ durationList, classes, locations, promotion, targeted, onChange, onDateChange,handleSchedule}) => {
    return (
        <form className={classes.form} onSubmit={handleSchedule}>
            <SelectField
                fullWidth
                selectOptions={locations}
                value={promotion.promo_location}
                name='promo_location'
                label='Target'
                onChange={onChange}
            />
            <TextField
                fullWidth
                value={promotion.campaign_name}
                name='campaign_name'
                label='Campaign Name'
                onChange={onChange}
            />
            <div className={classes.inputWithCheckbox}>
                <TextField
                    fullWidth
                    value={promotion.reg_price}
                    name='reg_price'
                    label='Regular Price'
                    onChange={onChange}
                    icon="dollar-sign"
                    type="number"
                />
                <FormControlLabel
                    className={classes.label}
                    control={
                        <Checkbox
                            name='priceConfirmed'
                            checked={promotion.priceConfirmed}
                            color="primary"
                            onChange={onChange}
                        />
                    }
                    label="Price Confirmed"
                />
            </div>
            <DatePicker
                date={epochToDate(promotion.start)}
                label="Incentive Start Date"
                onDateChange={onDateChange}
            />

            <Duration
              /*  onChange={onChange}*/
                // selectedDuration={promotion.duration || '30'}
                durationList={durationList}/>
            <TextField
                fullWidth
                value={promotion.call_to_action}
                name='call_to_action'
                label='Call To Action'
                onChange={onChange}
            />
            <TextArea
                className={classes.textarea}
                fullWidth
                multiline
                rows={4}
                value={promotion.disclaimer}
                name='disclaimer'
                label='Disclaimer'
                onChange={onChange}
            />
            <FormButtons expires={epochToDate(promotion.stop)}/>

        </form>
    )
};


PromotionForm.propTypes = {
    onSchedule: PropTypes.func,
    locations: PropTypes.array.isRequired,
    durationList: PropTypes.array.isRequired,
    promotion: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PromotionForm);
