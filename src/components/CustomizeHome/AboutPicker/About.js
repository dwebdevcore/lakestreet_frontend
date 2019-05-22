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
const About = ({classes, about, selectedAbout, onRadioChange}) => (


    <FormControlLabel
        className={classes.label}
        control={
            <div className={classes.templateWrapper}>
                <div className={classes.template}>
                    <img src={about.image} alt={about.title}/>
                </div>
                <Radio
                    color='primary'
                    checked={selectedAbout === about.title}
                    onChange={onRadioChange}
                    value={about.title}
                    name='about_section'
                />
            </div>
        }
        label={about.title}
    />

);

About.propTypes = {
    about: PropTypes.object.isRequired,
    selectedAbout: PropTypes.string.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
