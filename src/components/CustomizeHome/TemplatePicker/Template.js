import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


const styles = theme => ({
    templateWrapper: {
        margin: theme.spacing.unit,
    },
    template: {
        width: 140,
        height: 164,
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
    },
});
const Template = ({classes, template, templateItem, onRadioChange}) => (


    <FormControlLabel
        className={classes.label}
        control={
            <div className={classes.templateWrapper}>
                <div className={classes.template}>
                    <img src={templateItem.image} alt={templateItem.title}/>
                </div>
                <Radio
                    color='primary'
                    checked={template === templateItem.title}
                    onChange={onRadioChange}
                    value={templateItem.title}
                    name='template'
                />
            </div>
        }
        label={templateItem.title}
    />

);

Template.propTypes = {
    templateItem: PropTypes.object.isRequired,
    template: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Template);
